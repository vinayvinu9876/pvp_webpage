var gallery_url_arr;
var no_of_img;
let ImageRef=firebase.database().ref('IC/gallery');

ImageRef.on('value',function(snap){


  try{
      var gallery_object=snap.val();

      gallery_url_arr=Object.keys(gallery_object).map(function(key) {
        return [key,gallery_object[key]];
      });
      console.log(gallery_url_arr);

      no_of_img=Object.keys(gallery_object).length;
      add_img_gallery();
      write_images();
    }
    catch(e)
    {
      console.log("There are no images to display for gallery "+e.name);
      no_of_img=0;
    }
});
function add_img_gallery()
{
  console.log("add_img_gallery function running vinay");

  var get_img_elem=document.getElementById('img_container');
  get_img_elem.innerHTML="";



  console.log("About to add images to gallery");

    for(i=1;i<=no_of_img;i++)
  {

      var  img_elem_html="<div class='col-md-4 col-sm-6 potfolio-item' data-scroll-reveal='enter from the bottom after 0.4s'  id='gal_img"+i+"'><img src='../images1/image_default.png' class='img-fluid' id='img"+i+"' height='200' width='360' ><hr /></div>";
      get_img_elem.innerHTML=get_img_elem.innerHTML+img_elem_html;
      try{console.log("From gallery"+no_of_img);add_portal_cont('gal_img'+i);}catch(e){console.log("not gallery portal");}
  }

}


function write_images()
{
  for(i=1;i<=no_of_img;i++)
  {
    var img_ref="img"+i;
    console.log("image ref is "+img_ref);
    var img_elem=document.getElementById(img_ref);
    console.log("the src of img before assigning is "+img_elem.src);
    img_elem.src=gallery_url_arr[no_of_img-i][1].img_url;
    img_elem.width="250";
    img_elem.heigth="200";

  }
}
