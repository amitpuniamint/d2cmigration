/*
Manages the validation &  DataTable of FIR Registration
*/

district_url = "/districts"
police_station_url = "/police-stations"


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
    {    
    return false;
    }
    return true;
   }


function set_select(id, val){
    $("#"+id).val(val);
}

function reset_select(id, value){
    val = '<option value="">'+value+'</option>';
    $('#'+id)
    .find('option')
    .remove()
    .end()
    .append(val)
    .val('');
}

function reset_text(id_list){
    id_list.forEach(function(row){
        $("#"+row).val("");
        $("#"+row).text("");
    });
}

function reset_radio(id_list){
    id_list.forEach(function(row){
        $("#"+row).click();
    });
}

        var Values = new Array();
        for (var i = 0; i < user_perm_list.length; i++) 
        {
          Values.push(parseInt(user_perm_list[i]));
        }
    $("#userauthperm").val(Values).trigger('change');

function load_sei_district_resource(url, data, elm_id, val_pos, text_pos, value){
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
     $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    });
    if(district_edit != "" && elm_id == "userauthdistrict"){
        $("#userauthdistrict").val(district_edit);

    }
    if(ps_edit != "" && elm_id == "userauthps"){
        $("#userauthps").val(ps_edit);

    }

  }});
}


$(document).ready(function() {

var user_state = $("#userauthtstate").val();

$("#userauthtstate").blur(function() {
    data = {"state": $("#userauthtstate").val()}
    
    load_sei_district_resource(district_url, data, "userauthdistrict", 0, 1, "Select District");

    if(district_edit != "" && ps_edit != "" ){
        data = {"state": $("#userauthtstate").val(), "district": district_edit}
        load_sei_district_resource(police_station_url, data, "userauthps", 0, 1, "Select Police Station");
    }else{
        load_sei_district_resource(district_url, data, "userauthdistrict", 0, 1, "Select District");
    }
});

$("#userauthdistrict").blur(function() {
  data = {"state": $("#userauthtstate").val(), "district": $("#userauthdistrict").val()}
  load_resource(police_station_url, data, "userauthps", 0, 1, "Select Police Station");
});

$("#userauthtstate").val(user_state).trigger("blur").trigger("change");
$("#userauthdistrict").val(district_edit).trigger("blur").trigger("change");


            $("#userauthtstate").val(user_state).trigger("blur").trigger("change");
            setTimeout(function(){
                     $("#userauthdistrict").val(district_edit).trigger("blur").trigger("change");
            }, 1000);
            setTimeout(function(){
                     $("#userauthps").val(ps_edit).trigger("blur").trigger("change");
            }, 1500);

});


function load_resource(url, data, elm_id, val_pos, text_pos, value){
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
     $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    });
    if(district_edit != "" && elm_id == "sei_district"){
        $("#sei_district").val(district_edit);
        district_edit = "";
    }
    if(ps_edit != "" && elm_id == "sei_ps"){
        $("#sei_ps").val(ps_edit);
        district_edit = "";
    }
  }});
}

function load_sei_district_resource(url, data, elm_id, val_pos, text_pos, value){
    reset_select(elm_id, value);
    $.ajax({ url: url, data: data, success: function(data){
    $.each(data, function(key, resource) {
     $('#'+elm_id).append($("<option></option>").attr("value",resource[val_pos]).text(resource[text_pos]));
    });
    if(district_edit != "" && elm_id == "userauthdistrict"){
        $("#userauthdistrict").val(district_edit);

    }
    if(ps_edit != "" && elm_id == "userauthps"){
        $("#userauthps").val(ps_edit);

    }

  }});
}

