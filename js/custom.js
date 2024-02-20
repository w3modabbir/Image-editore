let fileInput = document.querySelector(".file"),
filterOperation = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter_info .name");
filterValue = document.querySelector(".filter_info .value");
filterSlider = document.querySelector(".slider input");
roteOperation = document.querySelectorAll(".rotate button");
previewImg = document.querySelector(".preview_img img");
resentBtn = document.querySelector(".reset_btn");
chooseImgBtn = document.querySelector(".choose_img");
saveImgBtn = document.querySelector(".save_img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipVertical}, ${flipHorizontal})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImg = () =>{
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resentBtn.click();
        document.querySelector(".container").classList.remove("disable");
    })
}

filterOperation.forEach(option =>{
    option.addEventListener("click", ()=>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === "saturation"){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion
            filterValue.innerText = `${inversion}%`;
        } 
        else{
            filterSlider.max = "100";
            filterSlider.value = grayscale
            filterValue.innerText = `${grayscale}%`;
        }

    });
});

const updateFilter = () =>{
    filterValue.innerText = `${filterSlider.value}%`
    const selectedFilter = document.querySelector(".filter .active")
    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    }
    applyFilters();
}

roteOperation.forEach(option =>{
    option.addEventListener("click", ()=>{
        if(option.id === "left"){
            rotate -= 90;
        }
        else if(option.id === "right"){
            rotate += 90;
        }
        else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else if(option.id === "vertical"){
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilters();
    });
});
const resentFilterBtn = () =>{
    brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOperation[0].click(); 
    applyFilters();
}

// save images btn part 
const saveImg = () =>{
    const canvas = document.createElement("canvas");
    const abc = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    abc.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    abc.translate(canvas.width / 2, canvas.height / 2)
    if(rotate !== 0){
        abc.rotate(rotate * Math.PI / 180);
    }
    abc.scale(flipVertical, flipHorizontal );
    abc.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();

}

fileInput.addEventListener("change", loadImg);
filterSlider.addEventListener("input", updateFilter)
resentBtn.addEventListener("click", resentFilterBtn)
saveImgBtn.addEventListener("click", saveImg)
chooseImgBtn.addEventListener("click", () => fileInput.click());