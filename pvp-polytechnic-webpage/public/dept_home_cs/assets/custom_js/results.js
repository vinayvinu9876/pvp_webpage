var result_ref=firebase.database().ref('cs/results/');

var result_obj;
result_ref.on('value',function(snap){

  result_obj=snap.val();

  $('#sem1_no_of_stu').text(result_obj.1st sem.no_of_students);
  $('#sem1_no_of_stu_passed').text(result_obj.1st sem.passed);
  $('#sem1_pass_percentage').text(result_obj.1st sem.percentage);


});
