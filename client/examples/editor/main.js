



new cmsFrontEditor()
  .init()
  .then(({editor, emitter}) => {
    // emitter.on('editor:change', console.log);
  })
  .catch(console.error);
