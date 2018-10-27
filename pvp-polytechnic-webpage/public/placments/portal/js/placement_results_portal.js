var placements_results_ref=firebase.database().ref('placements/placement_results');
console.log("From placements");
var placement_result_arr;

placements_results_ref.on('value',function(snap){

try{

  var placement_result_obj=snap.val();

  $('#tns_cs').val(placement_result_obj.cs.total_no_of_students);
  $('#nos_cs').val(placement_result_obj.cs.no_of_students);
  $('#jhe_cs').val(placement_result_obj.cs.joined_for_higher_edu);
  $('#wii_cs').val(placement_result_obj.cs.working_in_industries);
  $('#tp_cs').val(placement_result_obj.cs.total_percentage);

  $('#tns_is').val(placement_result_obj.is.total_no_of_students);
  $('#nos_is').val(placement_result_obj.is.no_of_students);
  $('#jhe_is').val(placement_result_obj.is.joined_for_higher_edu);
  $('#wii_is').val(placement_result_obj.is.working_in_industries);
  $('#tp_is').val(placement_result_obj.is.total_percentage);


  $('#tns_ce').val(placement_result_obj.ce.total_no_of_students);
  $('#nos_ce').val(placement_result_obj.ce.no_of_students);
  $('#jhe_ce').val(placement_result_obj.ce.joined_for_higher_edu);
  $('#wii_ce').val(placement_result_obj.ce.working_in_industries);
  $('#tp_ce').val(placement_result_obj.ce.total_percentage);

  $('#tns_ee').val(placement_result_obj.ee.total_no_of_students);
  $('#nos_ee').val(placement_result_obj.ee.no_of_students);
  $('#jhe_ee').val(placement_result_obj.ee.joined_for_higher_edu);
  $('#wii_ee').val(placement_result_obj.ee.working_in_industries);
  $('#tp_ee').val(placement_result_obj.ee.total_percentage);

  $('#tns_ec').val(placement_result_obj.ec.total_no_of_students);
  $('#nos_ec').val(placement_result_obj.ec.no_of_students);
  $('#jhe_ec').val(placement_result_obj.ec.joined_for_higher_edu);
  $('#wii_ec').val(placement_result_obj.ec.working_in_industries);
  $('#tp_ec').val(placement_result_obj.ec.total_percentage);

  $('#tns_ic').val(placement_result_obj.ic.total_no_of_students);
  $('#nos_ic').val(placement_result_obj.ic.no_of_students);
  $('#jhe_ic').val(placement_result_obj.ic.joined_for_higher_edu);
  $('#wii_ic').val(placement_result_obj.ic.working_in_industries);
  $('#tp_ic').val(placement_result_obj.ic.total_percentage);

  $('#tns_at').val(placement_result_obj.at.total_no_of_students);
  $('#nos_at').val(placement_result_obj.at.no_of_students);
  $('#jhe_at').val(placement_result_obj.at.joined_for_higher_edu);
  $('#wii_at').val(placement_result_obj.at.working_in_industries);
  $('#tp_at').val(placement_result_obj.at.total_percentage);

  $('#tns_me').val(placement_result_obj.me.total_no_of_students);
  $('#nos_me').val(placement_result_obj.me.no_of_students);
  $('#jhe_me').val(placement_result_obj.me.joined_for_higher_edu);
  $('#wii_me').val(placement_result_obj.me.working_in_industries);
  $('#tp_me').val(placement_result_obj.me.total_percentage);

  $('#tns_adft').val(placement_result_obj.adft.total_no_of_students);
  $('#nos_adft').val(placement_result_obj.adft.no_of_students);
  $('#jhe_adft').val(placement_result_obj.adft.joined_for_higher_edu);
  $('#wii_adft').val(placement_result_obj.adft.working_in_industries);
  $('#tp_adft').val(placement_result_obj.adft.total_percentage);

  $('#year').val(placement_result_obj.year);
}
catch(e)
{
  console.log("\n\nAn error occured while writing results to html page\n"+e.message);
  /*write_err_output();*/
}

});


function update_results(path,value)
{
  console.log("\n\nUpdate Results ");
  if(value!=null || value!="")
  {
  firebase.database().ref('placements/placement_results/'+path).set(value);
  }
  else
  {
    $.notify("Cant set null value","error");
  }
}
