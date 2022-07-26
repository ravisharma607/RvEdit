const fileinput = document.querySelector('.file-input');
chooseimgBtn = document.querySelector('.choose-img');
previewImg = document.querySelector('.preview-img img');
filterOption = document.querySelectorAll('.filter button');
filterName = document.querySelector('.filter-info .name');
filterSlider = document.querySelector('.slider input');
filterValue = document.querySelector('.filter-info .value');
rotateOption = document.querySelectorAll('.rotate button');
resetFilterBtn = document.querySelector('.reset-filter');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const rotateImg = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical} )`;
}
const applyFilter = () =>{
    previewImg.style.filter = `brightness(${brightness}% )saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImg = () => {
    let file = fileinput.files[0]
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load',() => {
        document.querySelector('.container').classList.remove('disable');
    })
}


filterOption.forEach(option =>{
    option.addEventListener('click',()=>{
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;
        if(option.id === 'brightness'){
            filterSlider.max = '200';
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === 'saturation'){
            filterSlider.max = '200';
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === 'inversion'){
            filterSlider.max = '100';
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else{
            filterSlider.max = '100';
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    }    
    )
});

const updateFilter = () =>{
    filterValue.innerText = `${filterSlider.value}`;
    const selectedFilter = document.querySelector('.filter .active')

    if(selectedFilter.id === 'brightness'){
        brightness = filterSlider.value;
    }
    else if(selectedFilter.id === 'saturation'){
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id === 'inversion'){
        inversion = filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    }
    applyFilter();
}


rotateOption.forEach(option => {
    option.addEventListener('click', ()=>{
        if(option.id === 'left' ){
            rotate -= 90;
        }else if(option.id === 'right'){
            rotate += 90;
        }
        else if(option.id === 'horizontal'){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        rotateImg();
    })
})

let resetFilter = () =>{
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
 rotate = 0; flipHorizontal = 1; flipVertical = 1;
 filterOption[0].click();
 rotateImg();
 applyFilter();
}


fileinput.addEventListener('change',loadImg)
chooseimgBtn.addEventListener('click',() => fileinput.click());
filterSlider.addEventListener('input',updateFilter)
resetFilterBtn.addEventListener('click', resetFilter)