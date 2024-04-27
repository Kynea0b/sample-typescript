

interface eat {
	putIn(a: string): boolean;
	chew(b: string): boolean;
	swallow(c: string): boolean;
}

class Human implements eat{

	putIn(a: string):boolean {
		if (a.length < 10){
			console.log(a)
			return true;
		}else{
			return false;
		}
	}

	chew(a: string):boolean {
		if (a.length < 10){
			console.log(a)
			return true;
		}else{
			return false;
		}
	}

	public swallow(a: string):boolean {
		if (a.length < 10){
			console.log(a)
			return true;
		}else{
			return false;
		}
	}

}

const human = new Human();

human.chew("chew");
human.putIn("putIn");
human.swallow("swallow");
