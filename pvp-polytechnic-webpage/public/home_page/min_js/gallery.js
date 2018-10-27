var no_of_img;var img_url_arr;var gallery_img_ref=firebase.database().ref('home/gallery/');gallery_img_ref.on('value',function(snap){try{var img_url_obj=snap.val();no_of_img=Object.keys(img_url_obj).length;img_url_arr=Object.keys(img_url_obj).map(function(key){return[key,img_url_obj[key]]})}
catch(e)
{console.log("Gallery Error "+e);no_of_img=0;document.getElementById('gallerySLide').innerHTML="<h1>No Image</h1>"};if(no_of_img!=0)
{create_img_sec()}});function create_img_sec()
{console.log("Creating img_elements");var gallery_area=document.getElementById('gallerySLide');var tot_html="";gallery_area.innerHTML="";for(i=1;i<=no_of_img;i++)
{console.log("i========"+i);var img_html="<a href='img/gallery/img-large1.jpg' title='This is title' id='img_href"+i+"'><img class='gallery_img' src='img/gallery/img-small1.jpg' alt='img' id='g_img"+i+"'/><span class='view_btn'>View</span></a>";gallery_area.innerHTML=gallery_area.innerHTML+img_html;tot_html=tot_html+img_html}
write_img()}
function write_img()
{for(i=1;i<=no_of_img;i++)
{var href_elem=document.getElementById("img_href"+i);var img_elem=document.getElementById('g_img'+i);console.log("i==="+i);href_elem.href=img_url_arr[no_of_img-i][1].url;img_elem.src=img_url_arr[no_of_img-i][1].url}}
