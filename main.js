console.log("Fak u");

const RANDOM_IMG_ENDPOINT = "https://dog.ceo/api/breeds/image/random";

const BREEDS = ["affenpinscher", "african", "airedale", "akita", "appenzeller", "shepherd australian", "basenji", "beagle", "bluetick", "borzoi", "bouvier", "boxer", "brabancon", "briard", "norwegian buhund", "boston bulldog", "english bulldog", "french bulldog", "staffordshire bullterrier", "australian cattledog", "chihuahua", "chow", "clumber", "cockapoo", "border collie", "coonhound", "cardigan corgi", "cotondetulear", "dachshund", "dalmatian", "great dane", "scottish deerhound", "dhole", "dingo", "doberman", "norwegian elkhound", "entlebucher", "eskimo", "lapphund finnish", "bichon frise", "germanshepherd", "italian greyhound", "groenendael", "havanese", "afghan hound", "basset hound", "blood hound", "english hound", "ibizan hound", "plott hound", "walker hound", "husky", "keeshond", "kelpie", "komondor", "kuvasz", "labradoodle", "labrador", "leonberg", "lhasa", "malamute", "malinois", "maltese", "bull mastiff", "english mastiff", "tibetan mastiff", "mexicanhairless", "mix", "bernese mountain", "swiss mountain", "newfoundland", "otterhound", "caucasian ovcharka", "papillon", "pekinese", "pembroke", "miniature pinscher", "pitbull", "german pointer", "germanlonghair pointer", "pomeranian", "medium poodle", "miniature poodle", "standard poodle", "toy poodle", "pug", "puggle", "pyrenees", "redbone", "chesapeake retriever", "curly retriever", "flatcoated retriever", "golden retriever", "rhodesian ridgeback", "rottweiler", "saluki", "samoyed", "schipperke", "giant schnauzer", "miniature schnauzer", "english setter", "gordon setter", "irish setter", "sharpei", "english sheepdog", "shetland sheepdog", "shiba", "shihtzu", "blenheim spaniel", "brittany spaniel", "cocker spaniel", "irish spaniel", "japanese spaniel", "sussex spaniel", "welsh spaniel", "english springer", "stbernard", "american terrier", "australian terrier", "bedlington terrier", "border terrier", "cairn terrier", "dandie terrier", "fox terrier", "irish terrier", "kerryblue terrier", "lakeland terrier", "norfolk terrier", "norwich terrier", "patterdale terrier", "russell terrier", "scottish terrier", "sealyham terrier", "silky terrier", "tibetan terrier", "toy terrier", "welsh terrier", "westhighland terrier", "wheaten terrier", "yorkshire terrier", "tervuren", "vizsla", "spanish waterdog", "weimaraner", "whippet", "irish wolfhound"];

function getRandomElement(array){
	const i= Math.floor(Math.random()* array.length);
	return array[i];
}

function shuffleArray(array){
	return array.sort((a, b) => Math.random()- 0.5);
}

function getMultipleChoices(n, correctAnswer, possibleChoices){
	const choices = [correctAnswer];
	while (choices.length<n){
		let candidate = getRandomElement(possibleChoices);
		if (!choices.includes(candidate)) {
			choices.push(candidate)
		}
	}
	return shuffleArray(choices);
}

function getBreedFromUrl(url){
	let unsplitBreed = url.split("/").[4];
	let [breed, subbreed] = unsplitBreed.split("-");
	return [subbreed, breed].join(" ").trim();
}

async function fetchMessage(url){
	const response = await fetch(url);
	const body = await response.json();
	let {message} = body;
	return message;
}

function renderButtons(choiceArray, correctAnswer){
	function buttonHandler(e){
		if (e.target.value === correctAnswer) {
			e.target.value.classList.add(".correct");
		}else{
			e.target.value.classList.add(".incorrect");
			document.querySelector(`button[value = "${correctAnswer}"]`).classList.add(".correct");
		}
	}
	const options = getElementById("options");

	for(let choice of choiceArray){
		const button = document.createElement("button");

		button.textContent = choice;
		button.value = choice;
		button.name = choice;

		button.addEventListener("click", buttonHandler);
		options.appendChild(button);
	}
}

function renderQuiz(imgUrl, correctAnswer, choices){
	const image = document.createElement("img");
	image.setAttribute("src", imgUrl);

	const frame = document.getElementById("image-frame");
	image.addEventListener("load", ()=> {
		frame.replaceChild(image);
		renderButtons(choices, correctAnswer);
		})
}

async function loadQuizData(){
	document.getElementById("image-frame").textContent = "Fetching doggo ....";

	const doggoImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
	const correctBreed = getBreedFromUrl(doggoImgUrl);
	const breedChoices = getMultipleChoices(correctBreed, BREEDS);

	return [doggoImgUrl, correctBreed, breedChoices];
}

const [imgUrl, correctAnswer, choices]= await loadQuizData();
renderQuiz(imgUrl, correctAnswer, choices);