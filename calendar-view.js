var calendar = function()
{  
  var current = new Date();  
  var month = current.getMonth();  
  var day = current.getDate();  
  var year = current.getFullYear();  
  
  tempMonth = month +1;  
    
  var tempDate = new Date(tempMonth +' 1 ,'+year);  
  var tempweekday= tempDate.getDay();  
  var tempweekday2 = tempweekday;  
    
  if (month == 1)
  {  
    if ( (year%100!=0) && (year%4==0) || (year%400==0))
    {  
  
     totalFeb = 29;  
  
    }
     else
     {  
      
       totalFeb = 28;  
  
    }  
  
  }  
  
  var totalDays = ["31", ""+totalFeb+"","31","30","31","30","31","31","30","31","30","31"];  
    
  var padding= "";  
  
  while (tempweekday > 0) 
  { 
   
   padding += "<div class='premonth row'></div>";  
   tempweekday--;  
  
  }  

  dayAmount = totalDays[month];  

  i = "0";  
  while (i <= dayAmount)
  {  
    if (tempweekday2 > 6)
    {  
  
     tempweekday2 = 0;  
     padding += "</div><div>";  
  
    }  
    
    if (i == day)
    {  

     padding +="<div class='currentday'>"+i+"</div>";  
  
    }
     else
     {  
       
       padding +="<div class='currentmonth'>"+i+"</div>";   
  
    }  
        
    tempweekday2++;  
    i++;  
  
   }  
    
   var monthNames = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov", "Dec"];  
    
   var calendarTable = "<div class='calendar'> <div class='currentmonth'><h1>"+monthNames[month]+" "+ year +"</h1></div>" +
                       "<div class='row'>  <div class='span2'>Sun</div>  <div class='span2'>Mon</div> <div class='span2'>Tues</div> " +
                      "<div class='span2'>Wed</div> <div class='span2'>Thurs</div> <div class='span2'>Fri</div> <div class='span2'>Sat</div> </div>" +  
                       "</div>";  
} 
