let all_contest_array=[];
let all_contest=[];
let all_contest_id=[];

function fetchAllContest(){
  for (let i = 0; i < localStorage.length; i++)  {      
   let key = localStorage.key(i);
   if(key.includes("contest_ac_status:")){
     let contest_name=key.split("contest_ac_status:")[1];
     if(!contest_name.includes("-updated-time")){
      all_contest.push(contest_name);
     }
   }
  }
}


function formatContestName(contest_name){
  let arr=contest_name.split("-");
  let ans="";
  arr.forEach(str=>{
    ans+=str.charAt(0).toUpperCase() + str.slice(1)+" ";
  })
  return ans;
}
function findDetailsOfContest(contest_name){
  
  let contestName=formatContestName(contest_name);
  let page_no = 1;
  let link_for_total_particpant = `https://leetcode.com/contest/api/ranking/${contest_name}/?pagination=${page_no}&region=global`;
  let link_for_personal_rank = `https://leetcode.com/contest/api/myranking/${contest_name}/?region=global`;
  let total_participation;
    let fetchRes = fetch(link_for_total_particpant);
    fetchRes
    .then((res) => res.json())
    .then((user) => {
      total_participation=user.user_num;
      let fetchuser_rank = fetch(link_for_personal_rank);
      fetchuser_rank
      .then((res) => res.json())
      .then((user) => {
        all_contest_array.push({
          contest_id:user.my_rank.contest_id,
          formatedContestName:contestName,
          contest_name:contest_name,
          rank:user.my_rank.rank+1,
          score:user.my_rank.score,
          total_participat:total_participation
        })
        all_contest_id.push(user.my_rank.contest_id);
      });
    });
}

function fill_all_contest_array(){
  fetchAllContest();
  all_contest.forEach(element => {
    findDetailsOfContest(element);
  });

}

fill_all_contest_array();
setTimeout(() => {
  all_contest_id.sort();
  all_contest_id.reverse();
  localStorage.setItem("all_contest_id",JSON.stringify(all_contest_id));
  localStorage.setItem("all_contest_details",JSON.stringify(all_contest_array));
}, 2000);