let toy,index=0;function click_on_menu(t){$("li.nav-item").removeClass("active");let a=$(t);switch(a.addClass("active"),a.attr("id")){case"menu_home":setTimeout((()=>{document.location.href="../index.html"}),500);break;case"menu_toy":$("#div_task").attr("hidden",""),$("#div_toy").removeAttr("hidden");break;case"menu_task":$("#div_task").removeAttr("hidden"),$("#div_toy").attr("hidden","")}}function click_on_toy(t){let a;a=-1===t?toy[Math.floor(Math.random()*toy.length)]:$(t).attr("data"),$.get(`../data/text/${a}.txt`,(t=>{let a=t.split("\n"),d=`<div class="modal-header border-secondary">\n            <div class="d-flex flex-column ms-3">\n               <h3 class="m-0">${a[0]}</h3>\n               <span> Назва: ${a[1]}</span>\n               <span> Ціна: ${a[2]}</span>\n               <span> Кількість: ${a[3]}</span>\n            </div>\n            <button type="button" class="btn-close bg-warning me-3" data-bs-dismiss="modal" aria-label="Close"></button>\n         </div>\n         \n         <div class="modal-body">\n            <img src="../data/img/${a[4]}.jpg" class="w-100" alt="toy">\n         </div>\n         \n         <div class="modal-footer border-secondary">\n            <h5>${a[5]}</h5>\n         </div>`;$("#modal_content").html(d),$("#modal").modal("show")}))}function load_more_toy(t){let a=0;for(;a<t;){if(index>=toy.length)return void disable_load_button();$.get(`../data/text/${toy[index]}.txt`,(t=>{let a=t.split("\n"),d=`<div class="col-md-6 col-lg-4">\n               <div class="p-2 toy" onclick="click_on_toy(this)" data="${a[4]}">\n                  <img src="../data/img/${a[4]}.jpg" class="w-100" alt="toy">\n                  <div class="bg-warning text-center">${a[0]}</div>\n               </div>\n            </div>`;$("#toy").append(d)})),a++,index++}}function disable_load_button(){$("#load").addClass("disabled")}$("#modal").on("hidden.bs.modal",(()=>{$("li.nav-item").removeClass("active"),$("#menu_toy").addClass("active"),$("#div_task").attr("hidden",""),$("#div_toy").removeAttr("hidden")})),$(document).ready((()=>{setTimeout((()=>{$.get("../data/data.txt",(t=>{toy=t.split("\n"),toy.splice(toy.length-1,1),load_more_toy(6)}))}),300)}));