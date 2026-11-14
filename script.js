var form = document.getElementById("postform");
var titleinput = document.getElementById("title");
var contentinput = document.getElementById("content");
var postid = document.getElementById("postid");
var postsdiv = document.getElementById("posts");
var formtitle = document.getElementById("formtitle");
var savebtn = document.getElementById("savebtn");
var cancelbtn = document.getElementById("cancelbtn");

var posts = JSON.parse(localStorage.getItem("posts")) || [];

function saveposts(){
  localStorage.setItem("posts", JSON.stringify(posts));
}

function showposts(){
  postsdiv.innerHTML = "";

  if(posts.length == 0){
    postsdiv.innerHTML = "<p class='empty'>no posts yet</p>";
    return;
  }

  for(var i=0; i<posts.length; i++){
    var post = posts[i];
    var div = document.createElement("div");
    div.className = "post";

    div.innerHTML = "<h3>"+post.title+"</h3>"+
      "<p class='small'>status: "+post.status+"</p>"+
      "<p>"+post.content+"</p>"+
      "<div class='actions'>"+
      "<button onclick='editpost("+i+")'>edit</button>"+
      "<button onclick='togglepost("+i+")'>"+(post.status=="published" ? "unpublish":"publish")+"</button>"+
      "<button class='delete' onclick='deletepost("+i+")'>delete</button>"+
      "</div>";

    postsdiv.appendChild(div);
  }
}

form.onsubmit = function(e){
  e.preventDefault();

  var title = titleinput.value;
  var content = contentinput.value;
  var id = postid.value;

  if(id == ""){
    posts.push({title:title, content:content, status:"published"});
  }else{
    posts[id].title = title;
    posts[id].content = content;
  }

  saveposts();
  showposts();
  resetform();
}

function editpost(i){
  postid.value = i;
  titleinput.value = posts[i].title;
  contentinput.value = posts[i].content;
  formtitle.innerHTML = "edit post";
  savebtn.innerHTML = "save";
  cancelbtn.className = "";
}

function togglepost(i){
  if(posts[i].status == "published"){
    posts[i].status = "draft";
  }else{
    posts[i].status = "published";
  }
  saveposts();
  showposts();
}

function deletepost(i){
  posts.splice(i,1);
  saveposts();
  showposts();
  resetform();
}

function resetform(){
  form.reset();
  postid.value = "";
  formtitle.innerHTML = "create post";
  savebtn.innerHTML = "publish post";
  cancelbtn.className = "hide";
}

cancelbtn.onclick = resetform;

showposts();
