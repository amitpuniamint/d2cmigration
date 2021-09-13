    function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

       function isDecimalKey(evt)
       {
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;

          return true;
       }

function IsKnownListedCriminal(opt)
{
    if (opt == 'Y')
	{
        document.getElementById('isknowncriminaldetails').disabled = false;
    }
	else
	{
        document.getElementById('isknowncriminaldetails').disabled = true;
	}
}

function IsWantedInAnyOtherCase(opt)
{
    if (opt == 'Y')
	{
        document.getElementById('iswanteddetails').disabled = false;
    }
	else
	{
        document.getElementById('iswanteddetails').disabled = true;
	}
}

function PreviouslyJumpedAnyBail(opt)
{
    if (opt == 'Y')
	{
        document.getElementById('isbailjumppreviousdetail').disabled = false;
    }
	else
	{
        document.getElementById('isbailjumppreviousdetail').disabled = true;
	}
}

function ArrestWitnessSameAsPermanant(opt)
{
    if (opt == 'N')
	{
        document.getElementById('arrestcompladdress2').disabled = false;
        document.getElementById('arrestcomplcountry2').disabled = false;
        document.getElementById('arrestcomplstate2').disabled = false;
        document.getElementById('arrestcompldistrict2').disabled = false;
        document.getElementById('arrestcomplps2').disabled = false;
    }
	else
	{
        document.getElementById('arrestcompladdress2').disabled = true;
        document.getElementById('arrestcomplcountry2').disabled = true;
        document.getElementById('arrestcomplstate2').disabled = true;
        document.getElementById('arrestcompldistrict2').disabled = true;
        document.getElementById('arrestcomplps2').disabled = true;
	}
}


	   
	   function isagetypedata()
{
    if (document.getElementById("accagetype").value == "0") 
	{
    	document.getElementById("accdob").disabled=false;
    	document.getElementById("accyob").disabled=true;
    	document.getElementById("accageyear").disabled=true;
    	document.getElementById("accagemonth").disabled=true;
    	document.getElementById("accagefrom").disabled=true;
    	document.getElementById("accageto").disabled=true;

    } 
    else if (document.getElementById("accagetype").value == "1") 
	{
    	document.getElementById("accdob").disabled=true;
    	document.getElementById("accyob").disabled=true;
    	document.getElementById("accageyear").disabled=true;
    	document.getElementById("accagemonth").disabled=true;
    	document.getElementById("accagefrom").disabled=false;
    	document.getElementById("accageto").disabled=false;

    } 
    else if (document.getElementById("accagetype").value == "2") 
	{
    	document.getElementById("accdob").disabled=true;
    	document.getElementById("accyob").disabled=true;
    	document.getElementById("accageyear").disabled=false;
    	document.getElementById("accagemonth").disabled=false;
    	document.getElementById("accagefrom").disabled=true;
    	document.getElementById("accageto").disabled=true;


    } 
    else if (document.getElementById("accagetype").value == "3") 
	{
    	document.getElementById("accdob").disabled=true;
    	document.getElementById("accyob").disabled=false;
    	document.getElementById("accageyear").disabled=true;
    	document.getElementById("accagemonth").disabled=true;
    	document.getElementById("accagefrom").disabled=true;
    	document.getElementById("accageto").disabled=true;

    } 
	
	else {
    	document.getElementById("accdob").disabled=true;
    	document.getElementById("accyob").disabled=true;
    	document.getElementById("accageyear").disabled=true;
    	document.getElementById("accagemonth").disabled=true;
    	document.getElementById("accagefrom").disabled=true;
    	document.getElementById("accageto").disabled=true;

    }
}

	   function isvictimagetypedata()
{
    if (document.getElementById("victimagetype").value == "0") 
	{
    	document.getElementById("victimdob").disabled=false;
    	document.getElementById("victimyob").disabled=true;
    	document.getElementById("victimageyear").disabled=true;
    	document.getElementById("victimagemonth").disabled=true;
    	document.getElementById("victimagefrom").disabled=true;
    	document.getElementById("victimageto").disabled=true;

    } 
    else if (document.getElementById("victimagetype").value == "1") 
	{
    	document.getElementById("victimdob").disabled=true;
    	document.getElementById("victimyob").disabled=true;
    	document.getElementById("victimageyear").disabled=true;
    	document.getElementById("victimagemonth").disabled=true;
    	document.getElementById("victimagefrom").disabled=false;
    	document.getElementById("victimageto").disabled=false;

    } 
    else if (document.getElementById("victimagetype").value == "2") 
	{
    	document.getElementById("victimdob").disabled=true;
    	document.getElementById("victimyob").disabled=true;
    	document.getElementById("victimageyear").disabled=false;
    	document.getElementById("victimagemonth").disabled=false;
    	document.getElementById("victimagefrom").disabled=true;
    	document.getElementById("victimageto").disabled=true;


    } 
    else if (document.getElementById("victimagetype").value == "3") 
	{
    	document.getElementById("victimdob").disabled=true;
    	document.getElementById("victimyob").disabled=false;
    	document.getElementById("victimageyear").disabled=true;
    	document.getElementById("victimagemonth").disabled=true;
    	document.getElementById("victimagefrom").disabled=true;
    	document.getElementById("victimageto").disabled=true;

    } 
	
	else {
    	document.getElementById("victimdob").disabled=true;
    	document.getElementById("victimyob").disabled=true;
    	document.getElementById("victimageyear").disabled=true;
    	document.getElementById("victimagemonth").disabled=true;
    	document.getElementById("victimagefrom").disabled=true;
    	document.getElementById("victimageto").disabled=true;

    }
}

	   function iseditvictimagetypedata()
{
    if (document.getElementById("editvictimagetype").value == "0") 
	{
    	document.getElementById("editvictimdob").disabled=false;
    	document.getElementById("editvictimyob").disabled=true;
    	document.getElementById("editvictimageyear").disabled=true;
    	document.getElementById("editvictimagemonth").disabled=true;
    	document.getElementById("editvictimagefrom").disabled=true;
    	document.getElementById("editvictimageto").disabled=true;

    } 
    else if (document.getElementById("editvictimagetype").value == "1") 
	{
    	document.getElementById("editvictimdob").disabled=true;
    	document.getElementById("editvictimyob").disabled=true;
    	document.getElementById("editvictimageyear").disabled=true;
    	document.getElementById("editvictimagemonth").disabled=true;
    	document.getElementById("editvictimagefrom").disabled=false;
    	document.getElementById("editvictimageto").disabled=false;

    } 
    else if (document.getElementById("editvictimagetype").value == "2") 
	{
    	document.getElementById("editvictimdob").disabled=true;
    	document.getElementById("editvictimyob").disabled=true;
    	document.getElementById("editvictimageyear").disabled=false;
    	document.getElementById("editvictimagemonth").disabled=false;
    	document.getElementById("editvictimagefrom").disabled=true;
    	document.getElementById("editvictimageto").disabled=true;


    } 
    else if (document.getElementById("editvictimagetype").value == "3") 
	{
    	document.getElementById("editvictimdob").disabled=true;
    	document.getElementById("editvictimyob").disabled=false;
    	document.getElementById("editvictimageyear").disabled=true;
    	document.getElementById("editvictimagemonth").disabled=true;
    	document.getElementById("editvictimagefrom").disabled=true;
    	document.getElementById("editvictimageto").disabled=true;

    } 
	
	else {
    	document.getElementById("editvictimdob").disabled=true;
    	document.getElementById("editvictimyob").disabled=true;
    	document.getElementById("editvictimageyear").disabled=true;
    	document.getElementById("editvictimagemonth").disabled=true;
    	document.getElementById("editvictimagefrom").disabled=true;
    	document.getElementById("editvictimageto").disabled=true;

    }
}


	   function iswitnessagetypedata()
{
    if (document.getElementById("witnessagetype").value == "0") 
	{
    	document.getElementById("witnessdob").disabled=false;
    	document.getElementById("witnessyob").disabled=true;
    	document.getElementById("witnessageyear").disabled=true;
    	document.getElementById("witnessagemonth").disabled=true;
    	document.getElementById("witnessagefrom").disabled=true;
    	document.getElementById("witnessageto").disabled=true;

    } 
    else if (document.getElementById("witnessagetype").value == "1") 
	{
    	document.getElementById("witnessdob").disabled=true;
    	document.getElementById("witnessyob").disabled=true;
    	document.getElementById("witnessageyear").disabled=true;
    	document.getElementById("witnessagemonth").disabled=true;
    	document.getElementById("witnessagefrom").disabled=false;
    	document.getElementById("witnessageto").disabled=false;

    } 
    else if (document.getElementById("witnessagetype").value == "2") 
	{
    	document.getElementById("witnessdob").disabled=true;
    	document.getElementById("witnessyob").disabled=true;
    	document.getElementById("witnessageyear").disabled=false;
    	document.getElementById("witnessagemonth").disabled=false;
    	document.getElementById("witnessagefrom").disabled=true;
    	document.getElementById("witnessageto").disabled=true;


    } 
    else if (document.getElementById("witnessagetype").value == "3") 
	{
    	document.getElementById("witnessdob").disabled=true;
    	document.getElementById("witnessyob").disabled=false;
    	document.getElementById("witnessageyear").disabled=true;
    	document.getElementById("witnessagemonth").disabled=true;
    	document.getElementById("witnessagefrom").disabled=true;
    	document.getElementById("witnessageto").disabled=true;

    } 
	
	else {
    	document.getElementById("witnessdob").disabled=true;
    	document.getElementById("witnessyob").disabled=true;
    	document.getElementById("witnessageyear").disabled=true;
    	document.getElementById("witnessagemonth").disabled=true;
    	document.getElementById("witnessagefrom").disabled=true;
    	document.getElementById("witnessageto").disabled=true;

    }
}


function minmax(value, min, max) 
{
    if(parseInt(value) < min || isNaN(parseInt(value))) 
        return 0; 
    else if(parseInt(value) > max) 
        return 0; 
    else return value;
}