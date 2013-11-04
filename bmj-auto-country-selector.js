/*============================BMJ Auto Country==============================*/
/* =======================================================================   
* BmjAutoCountrySelector
* Converts any inputfile assigned to, into a Auto compelete country drop down 
* which display the list of all countries coming from a jsonp with their flags 
* @param idOfTheField  : id of the input converting into country drop down
* bmjIcsCountries  (jasonp) : List of ICS countries
*===========================================================================*/
BmjAutoCountrySelector = function()
{
    
    this.minChars      = 1;
    this.field         = null;
    this.countryLoopId = 0;
    this.helper        = null;
    this.helperContent = "";
    
}

BmjAutoCountrySelector.prototype = 
{
    
    init : function(idOfTheField)
    {
       
        this.field = document.getElementById(idOfTheField);
        
        if (!this.field)
        {
            alert("Wrong input !");
        }
       
        else
        {
            this.createHelper();
            this.field.onfocus = this.onFieldIn;
            this.field.onkeydown = this.onFieldInkeyup;
            this.field.onblur = this.onFieldOut;
        }
    },
    
    //triggers when focused on country input
    onFieldIn : function()
    {
    
        bcs.loop();
        
    },
    
    //closes the auto complete on blur
    onFieldOut : function()
    {
     
        clearTimeout(bcs.countryLoopId);
      //  setTimeout("bcs.hideHelper()", 600);
        
    },
    
    //scroll the country list up and down with the arrow keys
    onFieldInkeyup : function(e)
    {
        e = e || window.event;
       
        if (e.keyCode == '38') { // down arrow
            //has the dropdown list been rendered
            if(document.getElementById("bmj-myaccount-widget-registration-auto-country-helper").children[0] != null){
                var elParent = document.getElementById('bmj-myaccount-widget-registration-auto-country-helper' )
                var elements = elParent.getElementsByTagName("a");
             
                
                var counter = 0;

                
                for ( var i = 0; i < elements.length; i++)
                {
                   if (elements[i].classList.contains("highlighted")) 
                    {
                        counter ++;
                        //alert("counter = " + counter)
                        if(counter - 1 > 0 )
                        {
                            
                            counter --;
                            counter --;
                            
                            elements[i].classList.remove('highlighted');
                            elements[counter].classList.add('highlighted');
                            elements[counter].scrollIntoView();
                        }                       
                        
                        return false;
                        
                    } 
                    else 
                    {
                        counter ++;                         
                    }
                   
                }


            }
        }
        else 
         if (e.keyCode == '40') 
         { // up arrow
            
            //has the dropdown list been rendered
            if(document.getElementById("bmj-myaccount-widget-registration-auto-country-helper").children[0] != null)
            {
                
                //is the a 'a' elemnt of the helper that is set to highlighted      
                var current = document.getElementById('#bmj-myaccount-widget-registration-auto-country-helper a').hasClass('highlighted');
                //$curr = $('bmj-myaccount-widget-registration-auto-country-helper').find('a.highlighted');
                
                var elements = current.getElementsByTagName("a");
                //var elements = $('#countryDropDownEntry a' );
                
                if(!current)
                {
                    //alert("highlighted class not assigned");
                    //$curr.addClass('highlighted');
                    elements[0].classList.add('highlighted');
                    elements[0].scrollIntoView();
                }
                else
                {
                    
                    var counter = 0;

                    for ( var i = 0; i < elements.length; i++)
                    {

                        if (elements[i].hasClass("highlighted")) 
                        {
                            counter ++;
                            
                            if(counter < elements.length)
                            {
                                elements[i].classList.removeClass('highlighted');
                                elements[counter].classList.addClass('highlighted');
                                elements[counter].scrollIntoView();
                            }
                            
                            
                            return false;
                            
                        } 
                        else 
                        {
                            counter ++;                         
                        }

                    }

                             
                }  //else                             
            }// if
        }//if
         else if (e.keyCode == '13')
         {
             if(document.getElementById("bmj-myaccount-widget-registration-auto-country-helper").children[0] != null)
             {
                 var elements = $('#bmj-myaccount-widget-registration-auto-country-helper a.highlighted' ).trigger('click');
                // setCountry();
             }
             
         }
        
    },
    
    //generates the country list
    loop : function()
    
    {
       
        var list = "";
        var value = bcs.field.value;
        var bmjIcsCountries = getIcsCountries();
        if (value.length >= this.minChars)
        {
            var numOfCountries = bmjIcsCountries.length;
            
            for ( var i = 0; i < numOfCountries; i++)
            {
               
                if (value.toLowerCase() == bmjIcsCountries[i].countryName
                        .substr(0, value.length).toLowerCase())
                {
                    
                    list += '<div tab-index="4"><a '                           
                            + 'onClick="javascript:return bcs.setCountry(\''
                            + bmjIcsCountries[i].countryName + '\',\''
                            + bmjIcsCountries[i].countryCode
                            + '\');" href="#"><i class="icon-flag-'
                            + bmjIcsCountries[i].countryCode + '"></i>'
                            + bmjIcsCountries[i].countryName + '</a></div>'
                }
            }
        }
       
        if (list != "")
        {
          
            if (this.helperContent != list)
            {
               
                this.helperContent = list ;
                this.helper.innerHTML = this.helperContent;
                
            }
            
            this.showHelper();
            
        }
        
        else
        {
           
            this.hideHelper();
            
        }
        
        bcs.countryLoopId = setTimeout("bcs.loop()", 200);
    },
    
    //set the value of the selected country into the form feild
    setCountry : function(country, countryCode)
    {
         
        this.field.value = country;
        document.getElementById('bmj-myaccount-widget-reg-countryCode').value = countryCode;
        this.hideHelper();
        $(bmjMyAccountWigetRegistration.form.termsAccepted).focus();  
        return false;
        
    },    
    
    
    // creating the autcoplete Helper
    createHelper : function()
    {
        
        this.helper = document.createElement("div");
        this.helper.style.width = (this.field.offsetWidth - 22) + "px";
        this.helper.setAttribute("id",
                "bmj-myaccount-widget-registration-auto-country-helper");
       
        this.helper.innerHTML = "";
       
        document.getElementById("countryFieldHelperHolder").appendChild(
                this.helper);
        
        this.positionHelper();
        this.hideHelper();
    },
    
    positionHelper : function()
    {
        
        var position = {
            x : 0,
            y : 0
        };
        
        var e = this.field;
       
        while (e)
        {
           
            position.x += e.offsetLeft;
            position.y += e.offsetTop;
            e = e.offsetParent;
            
        }
       
        this.helper.style.left = position.x + "px";
        this.helper.style.top = (position.y + this.field.offsetHeight) + "px";
    },
   
    showHelper : function()
    {
        
        this.helper.style.display = "block";

    },
  
    hideHelper : function()
    {
        this.helper.style.display = "none";

    }
}

var bcs = new BmjAutoCountrySelector();
