let fileInput = document.querySelector(".file"),
filterOperation = document.querySelectorAll(".filter button");
previewImg = document.querySelector(".preview_img img");
filterName = document.querySelector(".filter_info .name");
filterValue = document.querySelector(".filter_info .value");
filterSlider = document.querySelector(".slider input");
chooseImgBtn = document.querySelector(".choose_img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";

const applyFilters = () =>{
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImg = () =>{
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
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

fileInput.addEventListener("change", loadImg);
filterSlider.addEventListener("input", updateFilter)
chooseImgBtn.addEventListener("click", () => fileInput.click());