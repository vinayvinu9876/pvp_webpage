var tab_pane_ref=firebase.database().ref("home/");var news_array;var no_of_news;var events_array;var no_of_events;var notice_array;var no_of_notice;tab_pane_ref.on('value',function(snap){try{var news_obj=snap.val().news;no_of_news=Object.keys(news_obj).length;news_array=Object.keys(news_obj).map(function(key){return[news_obj[key]]})}
catch(e){console.log("No news "+e);no_of_news=0;document.getElementById('news_list_cont').innerHTML="<h1>No Data</h1>"}
try{var events_obj=snap.val().events;no_of_events=Object.keys(events_obj).length;events_array=Object.keys(events_obj).map(function(key){return[events_obj[key]]})}
catch(e){console.log("No events "+e);no_of_events=0;document.getElementById('notice_list_cont').innerHTML="<h1>No Data</h1>"}
try{var notice_obj=snap.val().notice;no_of_notice=Object.keys(notice_obj).length;notice_array=Object.keys(notice_obj).map(function(key){return[notice_obj[key]]})}
catch(e)
{console.log("No notice "+e);no_of_notice=0;document.getElementById('events_list_cont').innerHTML="<h1>No Data</h1>"}
if(no_of_news<3&&no_of_news!=0){create_list_pane(1,no_of_news,0,'news_list_cont','add_news_cont','news');write_list_pane(1,no_of_news,news_array,'news_img','news_desc','news_date',no_of_news)}
else if(no_of_news<=0){}
else{create_list_pane(1,3,0,'news_list_cont','add_news_cont','news');write_list_pane(1,3,news_array,'news_img','news_desc','news_date',no_of_news)}
if(no_of_notice<3&&no_of_notice!=0)
{create_list_pane(1,no_of_notice,0,'notice_list_cont','add_notice_cont','notice');write_list_pane(1,no_of_notice,notice_array,'notice_img','notice_desc','notice_date',no_of_notice)}
else if(no_of_notice<=0){}
else{create_list_pane(1,3,0,'notice_list_cont','add_notice_cont','notice');write_list_pane(1,3,notice_array,'notice_img','notice_desc','notice_date',no_of_notice)}
if(no_of_events<3&&no_of_events!=0)
{create_list_pane(1,no_of_events,0,'events_list_cont','add_events_cont','events');write_list_pane(1,no_of_events,events_array,'events_img','events_desc','events_date',no_of_events)}
else if(no_of_events<=0)
{}
else{create_list_pane(1,3,0,'events_list_cont','add_events_cont','events');write_list_pane(1,3,events_array,'events_img','events_desc','events_date',no_of_events)}});function create_list_pane(start,end,specified,visible_list_id,hidden_list_id,name)
{var visible_list_cont=document.getElementById(visible_list_id);var hdn_lst_cont=document.getElementById(hidden_list_id);var list_html="";for(i=start;i<=end;i++)
{list_html=list_html+"<li><div class='media'><div class='media-left'><a class='news_img' href='#'><img class='media-object' src='img/news.jpg' alt='img' id='"+name+"_img"+i+"'></a></div><div class='media-body'><p id='"+name+"_desc"+i+"'>hjcgccc</p><span class='feed_date' id='"+name+"_date"+i+"'>lksdnv</span></div></div></li>"}
if(specified===1)
{hdn_lst_cont.innerHTML=hdn_lst_cont.innerHTML+list_html}else{visible_list_cont.innerHTML="";visible_list_cont.innerHTML=visible_list_cont.innerHTML+list_html}}
function write_list_pane(start,end,data_array,img_id,desc_id,date_id,tot_list_count)
{for(i=start;i<=end;i++)
{var img_ref=document.getElementById(img_id+i);var desc_ref=document.getElementById(desc_id+i);var date_ref=document.getElementById(date_id+i);console.log(img_id+i);img_ref.src=data_array[tot_list_count-i][0].img_url;desc_ref.innerHTML=data_array[tot_list_count-i][0].description;date_ref.innerHTML=data_array[tot_list_count-i][0].date}}
function toggle_btn(list_id,see_btn_id,hide_btn_id)
{var hidden_lst=document.getElementById(list_id);var butt=document.getElementById(see_btn_id);var butt1=document.getElementById(hide_btn_id);butt.style.visibility='visible';butt1.style.visibility='hidden';hidden_lst.innerHTML=''}
function write_all(name,see_btn_id,hide_btn_id,max_num,DataArray)
{if(max_num>3)
{console.log("I m from events section");create_list_pane(4,max_num,1,name+'_list_cont','add_'+name+'_cont',name);write_list_pane(4,max_num,DataArray,name+'_img',name+'_desc',name+'_date',max_num)}
var butt=document.getElementById(see_btn_id);var butt1=document.getElementById(hide_btn_id);butt.style.visibility='hidden';butt1.style.visibility='visible'}
