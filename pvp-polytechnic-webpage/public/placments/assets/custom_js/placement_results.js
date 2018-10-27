var placements_results_ref=firebase.database().ref('placements/placement_results');
console.log("From placements");
var placement_result_arr;

placements_results_ref.on('value',function(snap){

try{

  var placement_result_obj=snap.val();

  $('#tns_cs').text(placement_result_obj.cs.total_no_of_students);
  $('#nos_cs').text(placement_result_obj.cs.no_of_students);
  $('#jhe_cs').text(placement_result_obj.cs.joined_for_higher_edu);
  $('#wii_cs').text(placement_result_obj.cs.working_in_industries);
  $('#tp_cs').text(placement_result_obj.cs.total_percentage+'%');

  $('#tns_is').text(placement_result_obj.is.total_no_of_students);
  $('#nos_is').text(placement_result_obj.is.no_of_students);
  $('#jhe_is').text(placement_result_obj.is.joined_for_higher_edu);
  $('#wii_is').text(placement_result_obj.is.working_in_industries);
  $('#tp_is').text(placement_result_obj.is.total_percentage+'%');


  $('#tns_ce').text(placement_result_obj.ce.total_no_of_students);
  $('#nos_ce').text(placement_result_obj.ce.no_of_students);
  $('#jhe_ce').text(placement_result_obj.ce.joined_for_higher_edu);
  $('#wii_ce').text(placement_result_obj.ce.working_in_industries);
  $('#tp_ce').text(placement_result_obj.ce.total_percentage+'%');

  $('#tns_ee').text(placement_result_obj.ee.total_no_of_students);
  $('#nos_ee').text(placement_result_obj.ee.no_of_students);
  $('#jhe_ee').text(placement_result_obj.ee.joined_for_higher_edu);
  $('#wii_ee').text(placement_result_obj.ee.working_in_industries);
  $('#tp_ee').text(placement_result_obj.ee.total_percentage+'%');

  $('#tns_ec').text(placement_result_obj.ec.total_no_of_students);
  $('#nos_ec').text(placement_result_obj.ec.no_of_students);
  $('#jhe_ec').text(placement_result_obj.ec.joined_for_higher_edu);
  $('#wii_ec').text(placement_result_obj.ec.working_in_industries);
  $('#tp_ec').text(placement_result_obj.ec.total_percentage+'%');

  $('#tns_ic').text(placement_result_obj.ic.total_no_of_students);
  $('#nos_ic').text(placement_result_obj.ic.no_of_students);
  $('#jhe_ic').text(placement_result_obj.ic.joined_for_higher_edu);
  $('#wii_ic').text(placement_result_obj.ic.working_in_industries);
  $('#tp_ic').text(placement_result_obj.ic.total_percentage+'%');

  $('#tns_at').text(placement_result_obj.at.total_no_of_students);
  $('#nos_at').text(placement_result_obj.at.no_of_students);
  $('#jhe_at').text(placement_result_obj.at.joined_for_higher_edu);
  $('#wii_at').text(placement_result_obj.at.working_in_industries);
  $('#tp_at').text(placement_result_obj.at.total_percentage+'%');

  $('#tns_me').text(placement_result_obj.me.total_no_of_students);
  $('#nos_me').text(placement_result_obj.me.no_of_students);
  $('#jhe_me').text(placement_result_obj.me.joined_for_higher_edu);
  $('#wii_me').text(placement_result_obj.me.working_in_industries);
  $('#tp_me').text(placement_result_obj.me.total_percentage+'%');

  $('#tns_adft').text(placement_result_obj.adft.total_no_of_students);
  $('#nos_adft').text(placement_result_obj.adft.no_of_students);
  $('#jhe_adft').text(placement_result_obj.adft.joined_for_higher_edu);
  $('#wii_adft').text(placement_result_obj.adft.working_in_industries);
  $('#tp_adft').text(placement_result_obj.adft.total_percentage+'%');

  $('#year').text(placement_result_obj.year);

}
catch(e)
{
  console.log("\n\nAn error occured while writing results to html page\n"+e.message);
  /*write_err_output();*/
}

});
