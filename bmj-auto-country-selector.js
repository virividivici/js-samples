/*============================BMJ Auto Country==============================*/
/* =======================================================================   
* BmjAutoCountrySelector
* Converts any input assigned to, into a Auto compelete country drop down like
* which display the list of all countries coming from a jsonp with their flags 
* @param idOfTheField  : id of the input converting into country drop down
* bmjbmjIcsCountries  (jasonp) : List of ICS countries included via requirJS
* on top level 
*===========================================================================*/

var BmjAutoIcsCountrySelector = function() 
{
	
	this.minChars = 1;
	this.field = null;
	this.countryLoopId = 0;
	this.containerId = "bmj-myaccount-widget-registration-auto-country-container";
	this.containerContent = "";
	this.countryValueFeild = "bmj-myaccount-widget-reg-countryCode";

}

BmjAutoIcsCountrySelector.prototype = 
{
	
	init:function(idOfTheField) 
	{
		this.field = document.getElementById(idOfTheField);

		if(!this.field) 
		{
			
			alert("No Element found.");
			//Not found the element to hope up the event to
		} 
			
			else

		{
			//initiating the dropdown/events
			this.createContainer();
			this.field.onfocus = this.onFieldIn;
			this.field.onblur = this.onFieldOut;

		}
	},

	onFieldIn:function() 
	{
		
		BAIC.loop();

	},

	onFieldOut:function() 
	{
		
		clearTimeout(BAIC.countryLoopId);
		setTimeout("BAIC.hideContainer()", 600);

	},

     //scroll the country list up and down with the arrow keys
    onFieldInkeyup : function(e)
    {
        e = e || window.event;

        var countryList = document.getElementById(this.containerId).children[0]
        var elParent = document.getElementById(this.containerId);
        var elements = elParent.getElementByTagName('a');
       
        if (e.keyCode === '38') 
        { // down arrow
            //has the dropdown list been rendered
            if(countryList !== null)
            {
                                
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
              
            }
        }
        else 
         if (e.keyCode == '40') 
         { // up arrow
            
            //has the dropdown list been rendered
            if( countryList !== null)
            {
                
                //is the a 'a' elemnt of the helper that is set to highlighted      
                var current = elParent.getElementByTagName('a').classList.contains('highlighted');

                if(!current)
                {
                    //alert("highlighted class not assigned");
                    //$curr.addClass('highlighted');
                    elements[0].classList.addClass('highlighted');
                    elements[0].scrollIntoView();
                }
                else
                {
                    
                    var counter = 0;
                   for ( var i = 0; i < elements.length; i++)
            		{
                        
                        if (elements[i].classList.contains("highlighted")) 
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
             if( countryList !== null )
             {
                 var elements =  elParent.getElementByTagName('a').classList.contains('highlighted').onClick();
                // setCountry();
             }
             
         }
        
    },


	loop:function() 
	{
		
		var list = "";
		var value = BAIC.field.value;
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
                            + bmjIcsCountries[i].countryName + '</a></div>';
                }
            }
        }

		if(list != "") 
		{
			if(this.containerContent != list) 
			{
				
				this.containerContent = list;
				this.container.innerHTML = this.containerContent;

			}

			this.showContainer();
		} 
		 else 
		{
			
			this.hideContainer();

		}

		BAIC.countryLoopId = setTimeout("BAIC.loop()", 200);
	},

	//set the value of the selected country into the form feild
    setCountry : function(country, countryCode)
    {
         
        this.field.value = country;
        document.getElementById(this.countryValueFeild).value = countryCode;
        this.hideContainer();
        $(bmjMyAccountWigetRegistration.form.termsAccepted).focus();  
        return false;
        
    },    

	
	createContainer:function() 
	{
		
        var container = document.createElement("div");
        container.style.width = (this.field.offsetWidth - 22) + "px";
        container.setAttribute("id", this.containerId);
       
        container.innerHTML = "";
       
        document.getElementById("countryFieldHelperHolder").appendChild(
                container);
        
        this.positionContainer();
		this.hideContainer();

	},

	positionContainer:function() 
	{
		var position = {x:0, y:0};
		var e = this.field;
		while(e) 
		{
			position.x += e.offsetLeft;
			position.y += e.offsetTop;
			e = e.offsetParent;
		}

		this.container.style.left = position.x + "px";
		this.container.style.top = (position.y + this.field.offsetHeight)+ "px";
	},

	showContainer:function() 
	{
		this.container.style.display = "block";
	},

	hideContainer:function() 
	{
		this.container.style.display = "none";
	}
}

var BAIC = new BmjAutoIcsCountrySelector();


