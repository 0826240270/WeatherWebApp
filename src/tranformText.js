function changeText(){
    var data = document.getElementsByClassName('temperature').value;
    document.write(data);
    if(data > 16){
        document.getElementsByClassName('temperature').style.color = "red";
    }
}