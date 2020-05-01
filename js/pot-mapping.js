$(document).ready(function(){
//step 1

	//
	$("#step1").change(function(){
		if( $(this).val() == "floridangordonteriary" ){
			$('#yearDisabled').hide();
			$('#FloridanGordonTeriaryAquifers').show();
			$('#CrouchBranchBlackCreekAquifers').hide();
			$('#McQueenBranchMiddendorfAquifers').hide();
		} else if( $(this).val() == "crouchbranchblackcreek" ){
			$('#yearDisabled').hide();			
			$('#FloridanGordonTeriaryAquifers').hide();
			$('#CrouchBranchBlackCreekAquifers').show();
			$("#McQueenBranchMiddendorfAquifers").hide();
		} else if( $(this).val() == "mcQueenbranchmiddendorf" ){
			$('#yearDisabled').hide();			
			$('#FloridanGordonTeriaryAquifers').hide();
			$("#CrouchBranchBlackCreekAquifers").hide();;
			$('#McQueenBranchMiddendorfAquifers').show();
		}
		
		$("#titleText").html("");
		$("#reportLink").attr("href", "");
		
	});
	
//step 2
	
	//
	$(".year").change(function(){

		if( $(this).val() == "2018a"){
			$("#titleText").html("SCDNR Report 61: Potentiometric Surface Maps of the Upper and Middle Floridan and Gordon Aquifers in South Carolina, November-December 2018");
			$("#reportLink").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_61_Floridan_Gordon_2018.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");
		} else if( $(this).val() == "2016a"){
			$("#titleText").html("SCDNR Report 60: Potentiometric Surface Maps of the South Carolina Coastal Plain, November-December 2016");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_60_Potentiometric_maps_2016.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2013a"){			
			$("#titleText").html("SCDNR Report 56: Potentiometric Surface of the Floridan and Tertiary Sand Aquifers in South Carolina, November 2013");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_56_Floridan_2013.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");
		} else if( $(this).val() == "2010a"){
			$("#titleText").html("SCDNR Report 53: Potentiometric Surface of the Floridan and Tertiary Sand Aquifers in South Carolina, November 2010");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_53_Floridan_2010.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2004a"){
			$("#titleText").html("SCDNR Report 48: Potentiometric Surface of the Floridan Aquifer and Tertiary Sand Aquifer in South Carolina, November 2004");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report48fFloridan.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");
		} else if( $(this).val() == "1998a"){			
			$("#titleText").html("SCDNR Report 23: Potentiometric Map of the Floridan and Tertiary Sand Aquifer in South Carolina, 1998");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_23_Floridan_1998.pdf");
			$("#titleText2").html("SCDNR Open-File Report 6: Water-level Measurements used in the Construction of the 1998 Potentiometric Map for the Floridan Aquifer and Tertiary Sand Aquifer in South Carolina");
			$("#reportLink2").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/Abs_dnr_of06.htm");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "1991_1993a"){			
			$("#titleText").html("SCWRC Open-File Report 43: Water-level Measurements and Potentiometric Maps for 1991-1993 Beaufort, Colleton, Hampton, and Jasper Counties, South Carolina, with Selected Hydrographs for 1975-1993");
			$("#reportLink").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/Abs_wrc_of43.htm");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "1990a"){
			$("#titleText").html("SCWRC Open-File Report 38: Potentiometric Surface of the Upper Floridan Aquifer, Beaufort Hampton, and Jasper Counties, South Carolina, March and July 1990");
			$("#reportLink").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/Abs_wrc_of38.htm");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "1986a"){			
			$("#titleText").html("SCWRC Report 157: Potentiometric Surface of the Floridan Aquifer in South Carolina, July 1986");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/Abs_wrc_R157.htm");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "1985a"){
			$("#titleText").html("SCWRC Open-File Report 14: Water Level Conditions in the Upper Permeable Zone of the Floridan Aquifer in the South Carolina Low Country, June 1985");
			$("#reportLink").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/Abs_wrc_of14.htm");
			$("#titleText2").html("SCWRC Open-File Report 13: Water Level Conditions in the Upper Permeable Zone of the Floridan Aquifer in the South Carolina Low Country, May 1985");
			$("#reportLink2").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/Abs_wrc_of13.htm");
			$("#titleText3").html("SCWRC Open-File Report 12: Water Level Conditions in the Upper Permeable Zone of the Floridan Aquifer in the South Carolina Low Country, March 1985");
			$("#reportLink3").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/Abs_wrc_of12.htm");
		} else if( $(this).val() == "1984a"){
			$("#titleText").html("SCWRC Open-File Report 20: Report on Water Level Conditions of Beaufort, Jasper, Colleton, and Hampton Counties, South Carolina During March 1984");
			$("#reportLink").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/Abs_wrc_of20.htm");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "1983a"){			
			$("#titleText").html("SCWRC Open-File Report 16: Water Level Conditions in Beaufort, Jasper, Colleton, and Hampton Counties, from Data Collected during August of 1983");
			$("#reportLink").attr("href", "http://www.dnr.sc.gov/water/hydro/HydroPubs/Abs_wrc_of16.htm");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2016b"){			
			$("#titleText").html("SCDNR Report 60: Potentiometric Surface Maps of the South Carolina Coastal Plain, November-December 2016");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_60_Potentiometric_maps_2016.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2015b"){
			$("#titleText").html("SCDNR Report 59: Potentiometric Surface of the Black Creek (Crouch Branch) Aquifer in South Carolina, November 2015");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_59_Black%20Creek_2015.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2012b"){			
			$("#titleText").html("SCDNR Report 55: Potentiometric Surface of the Black Creek Aquifer in South Carolina, November 2012");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_55_Black%20Creek_2012.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2009b"){
			$("#titleText").html("SCDNR Report 52: Potentiometric Surface of the Black Creek Aquifer in South Carolina, November 2009");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_52_Black_Creek_2009.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2004b"){
			$("#titleText").html("SCDNR Report 47: Potentiometric Surface of the Black Creek Aquifer in South Carolina, November 2004");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report47_BlackCreek.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2001b"){			
			$("#titleText").html("SCDNR Report 29: Potentiometric Surface of the Black Creek Aquifer in South Carolina, November 2001");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_29_Black_Creek.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "1995b"){			
			$("#titleText").html("SCDNR Report 16: Potentiometric Surface of the Black Creek Aquifer in South Carolina; November 1995");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/Abs_dnr_R16.htm");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2016c"){
			$("#titleText").html("SCDNR Report 60: Potentiometric Surface Maps of the South Carolina Coastal Plain, November-December 2016");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_60_Potentiometric_maps_2016.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2014c"){			
			$("#titleText").html("SCDNR Report 58: Potentiometric Surface of the Middendorf Aquifer in South Carolina, November 2014");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_58_Middendorf_2014.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2011c"){
			$("#titleText").html("SCDNR Report 54: Potentiometric Surface of the Middendorf Aquifer in South Carolina, November 2011");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_54_Middendorf_2011.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2009c"){
			$("#titleText").html("SCDNR Report 51: Potentiometric Surface of the Middendorf Aquifer in South Carolina, November 2009");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_51_Middendorf_2009.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2004c"){			
			$("#titleText").html("SCDNR Report 46: Potentiometric Surface of the Middendorf Aquifer in South Carolina, November 2004");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report46_Middendorf.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "2001c"){			
			$("#titleText").html("SCDNR Report 28: Potentiometric Surface of the Middendorf Aquifer in South Carolina, November 2001");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/pdf/Report_28_Middendorf.pdf");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		} else if( $(this).val() == "1996c"){			
			$("#titleText").html("SCDNR Report 19: Potentiometric Surface of the Middendorf Aquifer in South Carolina; November 1996");
			$("#reportLink").attr("href", "http://dnr.sc.gov/water/hydro/HydroPubs/Abs_dnr_R19.htm");
			$("#titleText2").html("");
			$("#reportLink2").attr("href", "");
			$("#titleText3").html("");
			$("#reportLink3").attr("href", "");			
		}
		
			
	});

});
