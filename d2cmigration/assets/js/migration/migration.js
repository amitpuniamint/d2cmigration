

// Migration Button Start
$('#migration_action_div_start').click( function(){
    hide_details()
    $('#logs_details_hide').show();
    $('#logs_details_show').hide();
    $('#data_in').show();
    start_migration()
    $('#migration_logs').show()
    });

// Migration Button Abort
$('#migration_action_div_stop').click( function(){
    hide_details()
    $('#logs_details_hide').show();
    $('#logs_details_show').hide();
    $('#data_in').show();
    stop_migration()
    $('#migration_logs').show()
});

$('#logs_details_hide').click(function(){
    $('#logs_details_hide').hide();
    $('#logs_details_show').show();
    $('#data_in').hide();
    hide_details();
});
$('#logs_details_show').click(function(){
    $('#logs_details_hide').show();
    $('#logs_details_show').hide();
    $('#data_in').show();
    hide_details();
});


    $('#show_fir').click(function(){
        $('#fir_details').show();
        $('#hide_fir').show();
        $('#show_fir').hide();
        var fir_get_value = $('#fir_details_status').val();
        if (fir_get_value == 0){
            get_fir_details();
        }
        
    })
    $('#hide_fir').click(function(){
        $('#hide_fir').hide();
        $('#show_fir').show();
        $('#fir_details').hide();        
    })

    $('#batch_details_hide').click(function(){
        $('#batch_details_show').show();
        $('#batch_details_hide').hide();
        $('#batch_details').hide();
        $('#fir_details').hide();
        $('#hide_fir').hide();
        $('#show_fir').show();
    });
    $('#batch_details_show').click(function(){
        $('#batch_details_hide').show();
        $('#batch_details_show').hide();
        $('#batch_details').show();
        hide_log_details()
    });
    function hide_details(){
        $('#batch_details_show').show();
        $('#batch_details_hide').hide();
        $('#batch_details').hide();
        $('#fir_details').hide();  
        $('#hide_fir').hide();
        $('#show_fir').show();
        $('#fir_details').hide();  
    }
    function hide_log_details(){
        $('#logs_details_hide').hide();
        $('#logs_details_show').show();
        $('#data_in').hide();
    }

    
// Get FIR Batch File
 function get_fir_details(){
        $('fir_details').show()
        $('#fir_details_status').val('2')
        $('#file_details_error').html('<code>Please Wait, While We are fatching Record from Server.........</code>')
        var pk = $('#history_pk').val()
        var AJAX_FILE = $.ajax({
            type:"GET",
            url: "/migration/fir_details/"+pk+"/",
            data:{'pk':pk},
        }).done(function(result,status,AJAX_FILE){
            if(result['status'] == true){
                var obj = jQuery.parseJSON( result['data'] );
                $('#file_details_error').text('')
                $('#fir_details_table').show()
                $('#fir_details_status').val('1')
                var t =$('#fir_list_datatable').DataTable({
                    pageLength : 5,
                    lengthMenu: [[5, 10, 20, 50,100], [5, 10, 20, 50,100 ]],
                    dom: "<'row'<'col-sm-3'l><'col-sm-3'f><'col-sm-6'p>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                    });

                jQuery.each(obj, function (i,val) {
                    var current_status = ''
                    if (val.current_status == 'N' ){
                        current_status = 'CREATE'
                    }else if (val.current_status == 'C'){
                        current_status = 'CANCLE BY USER'
                    }else if (val.current_status == 'S' ){
                        current_status = 'Migration Success'
                    }else if (val.current_status == 'F' ){
                        current_status = 'Migration Failed ['+val.failed_reason+']'
                    }else if (val.current_status ==  'A'){
                        current_status = 'Migration Abort By User'
                    }else if (val.current_status ==  'R'){
                        current_status = 'Migration Rollback ['+val.rollback_reason+']'
                    }
                    t.row.add( [
                            i,val.fir_reg_num,val.state,val.district,val.ps,val.reg_year,current_status
                        ] ).draw( false );

                })
                
            }else{
                $('#fir_details_status').val('0')
                $('#file_details_error').html("<code>** "+result['error']+"**</code>") 
            }
            
        }).fail(function(AJAX_FILE,status,err){
            $('#fir_details_status').val('0');
            $('#file_details_error').html('<code>** Due to System Error,Unable to Fatch Data.Please contact With Technical Team. **</code>') 
        })
        
    };


function get_migration_log(){
        var line_length = $('#line_length').val();
        var pk = $('#history_pk').val()
        var csrftoken = $('input[name="csrfmiddlewaretoken"]').val()
        var AJAX_FILE = $.ajax({
            type:"Post",
            url: "/migration/log_file/"+pk+"/"+line_length+"/",
            data:{'pk':pk,'csrfmiddlewaretoken':csrftoken,'line_number':line_length},
            }).done(function(result,status,AJAX_FILE){
                if(result['status']==true){
                    jQuery.each(result['data'], function (i,val) {
                    $('#data_in').append(val)
                    });
                    $('#line_length').val(result['total_line']); // update total line  
                    $('#data_in').animate({scrollTop: $('#data_in').prop("scrollHeight")}, 200); // Scroll Button
                    var is_migration_running = result['is_migration_running']
                    $('#is_migration_running').val(is_migration_running);
                    if(is_migration_running == 1){setTimeout(get_migration_log, 1000);
                    }
                    else if(is_migration_running == 2){
                        $('#migration_action_div_stop').hide();
                        $('#migration_complete').show();
                        $('#migration_complete').html("<a href='' class='btn btn-info'>Migration Complete</a>");
                    }
                    else if(is_migration_running == 3){
                        $('#migration_action_div_stop').hide();
                        $('#migration_complete').show();
                        $('#migration_complete').html("<code>Migration Failed **</code>");
                    }
                    else if(is_migration_running == 5){
                        $('#migration_action_div_stop').hide();
                        $('#migration_complete').show();
                        $('#migration_complete').html("<code>Migration Abort **</code>");
                    }

                }else{
                    $('#data_in').append("Migration Process is Run But Unable to fatch data from read file .Error:"+result['error']+'.<br/>');
            };
            
            }).fail(function(AJAX_FILE,status,err){
                $('#data_in').append('Migration Process is Run But Unable to fatch data from read file .Error:'+err+'.<br/>');
                $('#data_in').animate({scrollTop: $('#data_in').prop("scrollHeight")}, 200); // Scroll Button
        })


        
    }

    
function start_migration(){
        $('#migration_system_message').text('');
        $('#migration_system_message').show();
        var pk = $('#history_pk').val()
        var csrftoken = $('input[name="csrfmiddlewaretoken"]').val()
        var AJAX_FILE = $.ajax({
            type:"POST",
            url:"/migration/start/"+pk+"/",
            data:{'pk':pk,'csrfmiddlewaretoken':csrftoken},
        }).done(function(result,status,AJAX_FILE){
            if(result['status'] == true){
                $('#migration_system_message').append("<code style='color:green;'>***"+result['messages']+" ***</code>");
                setTimeout(function(){$('#migration_system_message').hide(5000);},10000);
                $('#migration_action_div_stop').show();
                $('#migration_action_div_start').hide();
                $('#is_migration_running').val('1');
                get_migration_log();
            }else{
                $('#migration_system_message').html("<code>***"+result['error']+"***</code>");
                setTimeout(function(){$('#migration_system_message').hide(5000);},10000);
            }
        }).fail(function(AJAX_FILE,status,err){
            $('#migration_system_message').append("<code>*** URL is mismatch due to which unable to START Migration</code>");
        });
    }

function stop_migration(){
    $('#migration_system_message').text('');
    $('#migration_system_message').show();
    var pk = $('#history_pk').val()
    var csrftoken = $('input[name="csrfmiddlewaretoken"]').val()
    var AJAX_FILE = $.ajax({
        type:"POST",
        url:"/migration/stop/"+pk+"/",
        data:{'pk':pk,'csrfmiddlewaretoken':csrftoken},
        }).done(function(result,status,AJAX_FILE){
            if(result['status'] == true){
                $('#migration_system_message').hide()
                $('#migration_system_message').text('')
                $('#migration_system_message').show()
                $('#migration_system_message').append("<code>***"+result['messages']+" ***</code>");
                setTimeout(function(){$('#migration_system_message').hide(5000);},10000);
                $('#migration_action_div_stop').hide();
                $('#migration_action_div_start').hide();
            }else{
                $('#migration_system_message').html("<code>***"+result['error']+"***</code>");
                setTimeout(function(){$('#migration_system_message').hide(5000);},10000);
            }

        }).fail(function(AJAX_FILE,status,err){
            $('#migration_system_message').append("<code>*** URL is mismatch due to which unable to START Migration</code>");
        });
}
