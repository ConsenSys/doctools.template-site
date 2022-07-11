function getPropValue(element, name){
  return getComputedStyle(element).getPropertyValue(name).trim()
}
function getTheme(element){
  const theme = {
    sidebar: {
      backgroundColor: getPropValue(element, '--dt-api-nav-bg-color'),
      textColor: getPropValue(element, '--md-default-fg-color'),
    }
  }
  return theme
}

function redocInitDone(){
  console.log("Redoc init finished!")
}

Redoc.init(
    specurl,
    {
      scrollYOffset:$('header').height(),
      theme: getTheme(document.body) },
    document.getElementById('redoc-container'),
    redocInitDone
)

var element = document.querySelector('body');
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === "attributes") {
      Redoc.init(
          specurl,
          { scrollYOffset:$('header').height(),
            theme: getTheme(mutation.target) },
          document.getElementById('redoc-container'),
          redocInitDone
      )
    }
  });
});

observer.observe(element, {
  attributeFilter: ['data-md-color-scheme'],
  attributes: true //configure it to listen to attribute changes
});
