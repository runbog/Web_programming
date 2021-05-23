let index = 0;
let toy;

function click_on_menu(object) {

    $("li.nav-item").removeClass("active");

    let item = $(object);

    item.addClass("active");

    let id = item.attr('id');

    switch (id) {

        case "menu_home":
            setTimeout(() => {
                document.location.href = "../index.html";
            }, 500);
            break;

        case "menu_toy":
            $("#div_task").attr("hidden", "");
            $("#div_toy").removeAttr("hidden");
            break;

        case "menu_task":
            $("#div_task").removeAttr("hidden");
            $("#div_toy").attr("hidden", "");
            break;
    }
}

function click_on_toy(object) {

    let element;

    if (object === -1) {
        element = toy[Math.floor(Math.random() * toy.length)];
    }
    else {
        element = $(object).attr("data");
    }

    $.get(`../data/text/${element}.txt`, (data) => {

        let item_data = data.split("\n");

        let block =
            `<div class="modal-header border-secondary">
            <div class="d-flex flex-column ms-3">
               <h3 class="m-0">${item_data[0]}</h3>
               <span> Назва: ${item_data[1]}</span>
               <span> Ціна: ${item_data[2]}</span>
               <span> Кількість: ${item_data[3]}</span>
            </div>
            <button type="button" class="btn-close bg-warning me-3" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         
         <div class="modal-body">
            <img src="../data/img/${item_data[4]}.jpg" class="w-100" alt="toy">
         </div>
         
         <div class="modal-footer border-secondary">
            <h5>${item_data[5]}</h5>
         </div>`;

        $("#modal_content").html(block);
        $('#modal').modal('show');

    });
}

function load_more_toy(count) {

    let id = 0;
    while (id < count) {

        if (index >= toy.length) {
            disable_load_button();
            return;
        }

        $.get(`../data/text/${toy[index]}.txt`, (data) => {

            let item_data = data.split("\n");

            let block =
                `<div class="col-md-6 col-lg-4">
               <div class="p-2 toy" onclick="click_on_toy(this)" data="${item_data[4]}">
                  <img src="../data/img/${item_data[4]}.jpg" class="w-100" alt="toy">
                  <div class="bg-warning text-center">${item_data[0]}</div>
               </div>
            </div>`;

            $("#toy").append(block);

        });

        id++;
        index++;
    }
}

function disable_load_button() {
    $("#load").addClass("disabled");
}

$("#modal").on("hidden.bs.modal", () => {
    $("li.nav-item").removeClass("active");
    $("#menu_toy").addClass("active");
    $("#div_task").attr("hidden", "");
    $("#div_toy").removeAttr("hidden");
});

$(document).ready(() => {
    setTimeout(() => {
        $.get("../data/data.txt", (data) => {
            toy = data.split("\n");
            toy.splice(toy.length - 1, 1);
            load_more_toy(6);
        });
    }, 300);
});