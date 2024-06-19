var studentRecords=[];

$(document).ready(function(){
    getFromLS();   
    displayInfo();

    $("#studentForm").submit(function(){
        var id=$("input[name='id']").val();
        var editOperation=id>0;
        if(editOperation){
            var student = studentRecords.find((p)=>p.id==id);
            student.fullName=$("input[name='txtName']").val(),
            student.mno=$("input[name='txtMobile']").val(),
            student.addr=$("textarea[name='txtAddress']").val(),
            student.bloodGroup=$("select[name='ddlBlood']").val(),
            student.gender=$("input[name='gender']").val(),
            student.eduDetails=getSelectedValues()
        }
        else{
            var student={
            id:(studentRecords.length+getRandomInt(1000)),
            fullName:$("input[name='txtName']").val(),
            mno:$("input[name='txtMobile']").val(),
            addr:$("textarea[name='txtAddress']").val(),
            bloodGroup:$("select[name='ddlBlood']").val(),
            gender:$("input[name='gender']").val(),
            eduDetails:getSelectedValues()
            };
        studentRecords.push(student);
        }
        displayInfo();
        //saveToLS();
        resetForm();
        return false;
    });
});

function resetForm(){
    $("form")[0].reset();
    $("input[name='id']").val(0);
}


function getSelectedValues(){
    var arr=[];
    $("input[name='educationDetails']:checked").each(function(i,e){
        arr.push($(e).val());
    });
    return arr;
}

function displayInfo(){
    var counter =1;
    var rows="";
    for(var student of studentRecords){
        var row="<tr>";
        row+="<td>"+counter+"</td>";
        row+="<td>"+student.fullName+"</td>";
        row+="<td>"+student.mno+"</td>";
        row+="<td>"+student.addr+"</td>";
        row+="<td>"+student.bloodGroup+"</td>";
        row+="<td>"+student.gender+"</td>";
        row+="<td>"+student.eduDetails.join(',')+"</td>";
        row+="<td><button type='button' onclick='editStudent("+student.id+")'  class='btn btn-primary btn-sm me-1'><span class='bi bi-pencil'></span></button><button type='button' onclick='deleteStudent("+student.id+")' class='btn btn-danger btn-sm ms-1'><span class='bi bi-trash'></span></button></td>";
        row+="</tr>";

        rows+=row;
        counter++;
    }
    $("table tbody").html(rows);
    saveToLS();
}

function deleteStudent(id){
    if(confirm("Are You Sure?")){
        var student=studentRecords.find((p)=>p.id==id);
        var index=studentRecords.indexOf(student);
        studentRecords.splice(index,1);
        displayInfo();
    }
}

function editStudent(id){
    resetForm();
    var student=studentRecords.find((p)=>p.id==id);
    $("input[name='id']").val(student.id);
    $("input[name='txtName']").val(student.fullName);
    $("input[name='txtMobile']").val(student.mno);
    $("textarea[name='txtAddress']").val(student.addr);
    $("select[name='ddlBlood']").val(student.bloodGroup);
    $("input[name='gender'][value='"+student.gender+"']").prop("checked",true);
    $(student.eduDetails).each(function (i,eduDetails){
        $("input[name='educationDetails'][value='"+eduDetails+"']").prop("checked",true);
    });
}

function saveToLS(){
    var strArray=JSON.stringify(studentRecords);
    localStorage.setItem("student",strArray);
}

function getFromLS(){
    var strArray=localStorage.getItem("student");
   studentRecords= JSON.parse(strArray);
}

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}