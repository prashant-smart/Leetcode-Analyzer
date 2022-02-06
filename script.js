const url="https://leetcode.com/api/problems/algorithms/";
var inject = (parentDiv) => {
  clearInterval(myTimer);
  
  
  var child_node_tag_solve = `
    <div class="ant-card css-8kh3x9 ant-card-small">
    <div class="ant-card-head">
       <div class="ant-card-head-wrapper">
          <div class="ant-card-head-title">Tags Solved</div>
       </div>
    </div>
    <div class="ant-card-body" style="display:flex;flex-direction:column;"  padding: 0px 12px 12px;">
    <div id="bar-graph" style="    margin-bottom: 23px;"><canvas id="myChart" ></canvas></div>
     </div>
 </div>`;
  

  var tablink = location.toString();
  tablink = tablink.replace("https://leetcode.com/","");
  let username=tablink.slice(0, -1);

  
  getApiData(url);

  let tagData_With_NumberOf_Questions=[];
  let total_tags=[];
  let sleepCounter=1;

  if(localStorage.getItem("userData")==null&&localStorage.getItem("error_fetching")==null){
    localStorage.setItem('error_fetching', 1);
    setTimeout(() => {
      
      location.reload();
    }, 2000);
  }
  let userData=JSON.parse(localStorage.getItem("userData"));

  if(userData.user_name!==username){
    return;
  }
  var tag_solve_div = document.createElement("div");
  tag_solve_div.innerHTML = child_node_tag_solve;
  tag_solve_div.className = "css-lw67gk";
  parentDiv.insertBefore(tag_solve_div, parentDiv.childNodes[2]);


  
  var nav_bar_left_section=document.getElementsByClassName("navbar-right-container__COIx")[0];
  var toggle_button=`<label class="switch">
                  <input id="toogleBtn" type="checkbox"  >
                  <span class="slider round"></span>
                </label>`;
  var parent_div_toggle_button=document.createElement("div");
  parent_div_toggle_button.className="nav-item-container__16kF";
  parent_div_toggle_button.innerHTML=toggle_button;
  nav_bar_left_section.insertBefore(parent_div_toggle_button, nav_bar_left_section.childNodes[0]);
  let toogle_button_elemnt = document.getElementById("toogleBtn");
  toogle_button_elemnt.onchange=()=>{
    let parentDiv_account_section=document.getElementsByClassName("profile-content-wrapper__3CQt")[0];
    let parentDiv_account_section_child=document.getElementsByClassName("profile-side-bar__3r8O")[0];
    let parentDiv_account_section_second_child=document.getElementsByClassName("profile-content__3PmZ")[0];
    console.log(toogle_button_elemnt.checked);
    if(toogle_button_elemnt.checked==true){
      parentDiv_account_section.classList.remove("parentDiv_display");
      parentDiv_account_section.classList.add("parentDiv");
      parentDiv_account_section_child.classList.add("parentDiv_child");
      parentDiv_account_section_second_child.classList.add("parentDiv_second_child");
      
    }else{
      parentDiv_account_section.classList.remove("parentDiv");
      parentDiv_account_section.classList.add("parentDiv_display");
      parentDiv_account_section_child.classList.remove("parentDiv_child");
      parentDiv_account_section_second_child.classList.remove("parentDiv_second_child");

    }
  };
  
  let total=0;
  userData.stat_status_pairs.forEach((element) => {
    const id = element.stat.question_id.toString(); 
    if (id in allTagsData&&element.status === "ac"){
      total++;
      const topicTags = allTagsData[id].tags;
      topicTags.forEach((tag)=>{
        total_tags.push(tag);
      })
    }
  
  })
  allTags.forEach((tag) => {
    let count=0;
    total_tags.forEach((tagName)=>{
      if(tagName===tag) count++;
    
    })
    if(count!==0){
        tagData_With_NumberOf_Questions.push({tag:tag, count:count});
    }
  })
  
  const background_color_for_bars=[];
  const barLabels_tagCount=[];
  const barLabels_tagName=[];
  
  tagData_With_NumberOf_Questions.forEach((tagDetails)=>{
    let tagName = tagDetails.tag;
    let tagCount = tagDetails.count;
    barLabels_tagCount.push(tagCount);
    barLabels_tagName.push(tagName);
    for(let idx in allTags){
      if(allTags[idx]===tagName){
        background_color_for_bars.push(allTagColor[idx]);
      }
    }
  })

 
  


  var Chart = require("chart.js");
  var ctx = document.getElementById("myChart");
 
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels:barLabels_tagName ,
      datasets: [
        {
          data: barLabels_tagCount,
          backgroundColor: background_color_for_bars,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        }
      },
    }
  });


  


};

  var myTimer = setInterval(() => {
    setTimeout(() => {
      clearInterval(myTimer);
    }, 10000);
    let parentDiv = document.getElementsByClassName("profile-content__3PmZ")[0];
    if (parentDiv !== undefined ) {
      inject(parentDiv);
    }
  }, 500);
  




async function getApiData(url){
     const response = await fetch(url);
     
     // Storing data in form of JSON
     var data = await response.json();
     const myJSON = JSON.stringify(data);
     localStorage.setItem('userData', myJSON);
}

// var tooglClasses=(e)=>{
  
// }

// browserify script.js -o bundle.js