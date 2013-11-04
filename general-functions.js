  /* ===========================================================================    
  * getUrlVars()
  * Read a page's GET URL variables and return them as an associative array.
  * example: getUrlVars()[nameOfParam]
  *===========================================================================*/
  function getUrlVars()
  {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    return vars;
  }

  /* ===========================================================================    
  * getAlternativeLocale()
  * detects the browser language and returns it for locale 
  * if not set or undefined set to defautl (en_GB) 
  *===========================================================================*/
  function getAlternativeLocale()
  {
    var lang = window.navigator.userLanguage || window.navigator.language;
    
    lang = lang.replace('-','_'); // replace en-US to en_GB
    
    //we share the same resources dor en_GB and en US , if there
    //is en_US resource available remove the last part of condition
    if(lang == undefined || lang == null || lang == 'en_US') 
    {
       
        lang = "en_GB"; 
        
    }
    
    return lang
  }

  /* ===========================================================================    
  * centerIt
  * Extending the jQuery function to centre any element/object in the page
  *===========================================================================*/
  var centerIt = function(element)
  {
     
    element.style.position = 'absolute';
    element.style.top = (screen.height - element.height) / 4);
    element.style.left = (screen.width() - element.width) / 2 ) 
        +  window.scrollMaxY;
    
    return this;
  };

  /* ===========================================================================    
  * clickedThing
  * Returns the element you have clicked on
  *===========================================================================*/
  function clickedThing(e, type)
  {
    var el = e.target;
    if(!el.is(type))
    {
      el = el.parents(type).slice(0,1);
    }
    
    return el;
  }



  /* ===========================================================================    
  * 
  * Returns Array Return an array with page width, height and window width, height/
  *===========================================================================*/
  function getPageSize() {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) 
    {
      xScroll = window.innerWidth + window.scrollMaxX;
      yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
      xScroll = document.body.scrollWidth;
      yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
      xScroll = document.body.offsetWidth;
      yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
      if(document.documentElement.clientWidth){
        windowWidth = document.documentElement.clientWidth;
      } else {
        windowWidth = self.innerWidth;
      }
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowWidth = document.body.clientWidth;
      windowHeight = document.body.clientHeight;
    }
    // for small pages with total height less then height of the viewport
    if(yScroll < windowHeight){
      pageHeight = windowHeight;
    } else {
      pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport
    if(xScroll < windowWidth){
      pageWidth = xScroll;
    } else {
      pageWidth = windowWidth;
    }
    arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
    return arrayPageSize;
  };
