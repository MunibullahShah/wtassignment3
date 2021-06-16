$(function () {
    loadMembers();
    $("#faculty").on("click", ".btn-delete", handleDelete);
    $("#faculty").on("click", ".btn-edit", handleUpdate);
    $("#addBtn").on("click", addMember);
    $("#updateSave").on("click", function () {
        var id = $("#updateId").val();
        var name = $("#Uname").val();
        var gender = $("#Ugender").val();
        var email = $("#Uemail").val();
        var country = $("#Ucountry").val();
        var city = $("#Ucity").val();
        var street_address = $("#Ustreet_address").val();
        var address = { country: country, city: city, street_address: street_address };
        var course_code = $("#Ucourse_code").val();
        var phone_number = $("#Uphone_numbers").val();
        phone_number = phone_number.split(";");

        var tosend = JSON.stringify({
            name,
            gender,
            email,
            address,
            course_code,
            phone_number,
        });
        $.ajax({
            url: "http://localhost:2500/faculty/" + id,
            headers: { "Content-Type": "application/json" },
            dataType: "json",
            data: tosend,
            method: "PUT",
            success: function (response) {
                console.log(response);
                loadMembers();
                $("#updateModal").modal("hide");
            },
        });
    });
});

function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".member");
    let id = parentDiv.attr("data-id");
    $.get("http://localhost:2500/faculty/" + id, function (response) {

        $("#updateId").val(response.id);
        $("#Uname").val(response.name);
        $("#Ugender").val(response.gender);
        $("#Uemail").val(response.email);
        $("#Ucountry").val(response.address.country);
        $("#Ucity").val(response.address.city);
        $("#Ustreet_address").val(response.address.street_address);
        $("#Ucourse_code").val(response.course_code);
        $("#Uphone_numbers").val(response.phone_numbers);

        $("#updateModal").modal("show");

    });
}


function addMember() {

    var name = $("#name").val();
    var gender = $("#gender").val();
    var email = $("#email").val();
    var country = $("#country").val();
    var city = $("#city").val();
    var street_address = $("#street_address").val();
    var address = { country: country, city: city, street_address: street_address };
    var course_code = $("#course_code").val();
    var phone_number = $("#phone_numbers").val();
    phone_number = phone_number.split(";");


    var tosend = JSON.stringify({
        name,
        gender,
        email,
        address,
        course_code,
        phone_number,
    });
    //console.log("Sending data" +tosend);
    //console.table(tosend);
    $.ajax({
        url: "http://localhost:2500/faculty",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        dataType: "json",
        data: tosend,
        success: function (response) {
            console.log(response);
            $("#name").val("");
            $("#gender").val("");
            $("#email").val("");
            $("#country").val("");
            $("#city").val("");
            $("#street_address").val("");
            $("#course_code").val("");
            $("#phone_numbers").val("");
            loadMembers();
            $("#addModal").modal("hide");
        },
    });
}
function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".member");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "http://localhost:2500/faculty/" + id,
        method: "DELETE",
        success: function () {
            loadMembers();
        },
    });
}
function loadMembers() {
    $.ajax({
        url: "http://localhost:2500/faculty",
        method: "GET",
        error: function (response) {
            var faculty = $("#faculty");
            faculty.html("An Error has occured");
        },
        success: function (response) {
            console.log("Hello");
            console.log(response);

            var faculty = $("#faculty");
            faculty.empty();
            for (var i = 0; i < response.length; i++) {
                var rec = response[i];
                numbers = rec.phone_number;
                faculty.append(
                    `<br><div class="member" data-id="${rec.id}"><br><br><br><hr><h4>${rec.name}</h4><p><button class="btn btn-delete btn-sm float-right delete">delete</button><button class="btn btn-edit btn-sm float-right edit">Edit</button><b>Gender:</b> ${rec.gender}</br><b>Email:</b> ${rec.email}</br><b>Address:</b><div class="address"><br>${rec.address.country},</br> ${rec.address.city}, ${rec.address.street_address}.</div></br><b>Phone numbers:</b> ${numbers}</br><b>Course Code:</b> ${rec.course_code}</p></p></div>`
                );
                // faculty.append("<div><h3>" + rec.title + "</h3></div>");
            }
        },
    });
}
