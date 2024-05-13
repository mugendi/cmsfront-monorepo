<!--
 Copyright (c) 2024 Anthony Mugendi
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script>
  import { selectionIsHeading, stripTags } from "../../lib/utils";

  export let eventEmitter;
  export let minWords = 3;

  let prompt = "start here and there";
  let disableButton = true;
  let isHeading = false;
  let promptSelect;
  let originalPrompt;
  let aiResponse;
  let aiRunning = false;

  let aiPrompts = {
    articleTitle: {
      option: "Article with title...",
      pre: "Write an article with the heading:",
      promptWords: 3,
    },
    articleBook: {
      option: "Article with books...",
      pre: "Write an book chapter with the heading:",
      promptWords: 3,
    },
  };

  eventEmitter.listen("setFocusedNode", function (node) {
    if (!node) return;

    let text = node.literal;

    if (text) {
      isHeading = node.parent.type == "heading" || selectionIsHeading(text);

      if (node.type == "htmlBlock") {
        text = stripTags(text);
      }

      originalPrompt = text;
      prompt = text;
    }
  });

  async function postPrompt() {
    aiRunning = true;

    await delay(2000);

    aiResponse = `In a bustling city, where towering skyscrapers cast long shadows and the cacophony of traffic filled the air, there lived a young boy named Ethan. Ethan was known for his inquisitive nature and unyielding belief in the extraordinary. One ordinary afternoon, as he ambled through a dusty attic, his gaze fell upon an unassuming old backpack tucked away in a corner. Curiosity sparked within him, and he couldn't resist reaching out to unravel the secrets it held.

As his fingers grazed the faded canvas, a soft hum reverberated through the attic. To his astonishment, the backpack began to quiver, its straps tightening around him like an affectionate embrace. Ethan felt a surge of exhilaration mingled with trepidation as an otherworldly energy coursed through his body. He realized that this was no ordinary backpack; it was a vessel imbued with untold power.

With newfound anticipation, Ethan carried the magical backpack to his bedroom, eager to explore its hidden capabilities. As he unzipped the main compartment, a cascade of iridescent light spilled forth, illuminating the room with an ethereal glow. A hushed whisper filled his ears, guiding him to a secret pocket concealed beneath the lining. Within this pocket, he discovered a shimmering scroll adorned with ancient runes.

Intrigued, Ethan unfurled the scroll, and his eyes widened in awe. Etched in an arcane language he did not recognize, the text whispered tales of extraordinary abilities granted to those who possessed the backpack. With trepidation, he reached for a nearby pen and inkwell, his hand trembling slightly as he began to trace the intricate symbols.

As the last stroke of his pen adorned the scroll, the backpack pulsated with a blinding light. The runes flared into existence, entwining themselves around Ethan's body like luminous vines. An overwhelming sensation of power surged through him, as if the very fabric of the universe had bent to his will.

Ethan marveled at the astonishing abilities that now coursed through his being. He could soar through the sky with effortless grace, his backpack acting as a pair of ethereal wings. Time itself seemed to slow down at his command, granting him the ability to witness the intricate dance of every passing moment. Objects danced to his whims, obeying his every thought and desire.

Overjoyed and filled with a sense of wonder, Ethan embarked on secret adventures using his newfound powers. He soared above the city, marveling at the vast tapestry of rooftops and bustling streets below. He visited distant lands in the blink of an eye, experiencing diverse cultures and making countless unforgettable memories.

However, with great power came great responsibility. Ethan realized that the magic backpack was not merely a tool for personal amusement but a gift that could be used to make a difference in the world. He used his abilities to help those in need, righting wrongs and spreading kindness wherever he went.

As the years passed, Ethan became a symbol of hope and inspiration, known throughout the city and beyond as the boy with the magic backpack. His extraordinary journey proved that even in the most mundane of objects, the potential for the extraordinary can lie dormant, waiting to be awakened by those who are brave enough to believe.`;

    aiRunning = false;
  }

  function useResponse() {
    eventEmitter.emit("command", "aiPrompt", aiResponse);
    eventEmitter.emit("closePopup");

    aiResponse = null;
    // originalPrompt=null;
  }

  function countWords() {
    let words = prompt.split(/\s/).filter((v) => v.length).length;
    disableButton = words < minWords;
  }

  function composeSamplePrompt(el) {
    promptSelect = el.target.value;
    let obj = aiPrompts[promptSelect];
    let pre = obj.pre || "";
    let post = obj.post || "";
    let promptWords = obj.promptWords || 1;

    if (countWords() < promptWords) {
      prompt = "";
      return;
    }

    if (originalPrompt) {
      prompt = [pre, originalPrompt, post].filter((v) => v && v.length).join(" ");
    }
  }

  function delay(time = 1000) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  $: {
    countWords(prompt);
  }
</script>

<div class="ai-container">
  <div class="toastui-editor-form">
    <div class="my-1">
      <label for="prompt-compose">Quick Prompt</label>
      <select
        name=""
        id="prompt-compose"
        on:change={composeSamplePrompt}
        class={promptSelect ? "" : "noValue"}
      >
        <option value="null" disabled selected> Select Prompt Type</option>
        {#each Object.keys(aiPrompts) as value}
          <option {value}> {aiPrompts[value].option} </option>
        {/each}
      </select>
    </div>
    <div class="my-1">
      <label for="prompt">Prompt</label>
      <textarea
        type="text"
        id="prompt"
        bind:value={prompt}
        placeholder="Type at least {minWords} words..."
      />
    </div>

    <button class="" on:click={postPrompt} disabled={disableButton || aiRunning}>
      {aiRunning ? "AI Loading..." : "Submit Prompt"}
    </button>
    <button disabled={!aiResponse || aiRunning} on:click={useResponse}> Use Response </button>
  </div>

  <div class="scroller response {aiResponse && aiResponse.length > 0 ? 'show' : ''}">
    <h2>Response</h2>
    <pre>{aiResponse}</pre>
  </div>
</div>

<style>
  div.ai-container {
    width: 450px;
  }
  h2 {
    margin: 2px 0;
  }

  .ai-container {
    display: flex;
    flex-direction: column;
  }

  .response {
    display: none;
    margin: 10px 0;
    padding: 10px;
    background: #eee;
    width: calc(100% - 20px);
    height: 300px;
    overflow: scroll;
  }

  .response.show {
    display: block;
  }

  pre {
    width: 100%;
    text-wrap: wrap;
  }

  

</style>
