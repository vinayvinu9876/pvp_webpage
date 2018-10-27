function user_add_posts_edit(id)
{
  var div_html="<div class='row set-row-pad'><div class='col-lg-4 col-md-4 col-sm-4'></div><div class='col-lg-8 col-md-8 col-sm-8' data-scroll-reveal='enter from the bottom after 0.4s'><center><img src='../images1/image_default.png' class='img-thumbnail' id='post_img' height='200' width='400'><p align='center' id='post_desc'>No text</p></center></div></div>";
document.getElementById(id).innerHTML=document.getElementById(id).innerHTML+div_html;
}
