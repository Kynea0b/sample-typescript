interface eat {
  putIn(a: string): boolean;
  chew(b: string): boolean;
  swallow(c: string): boolean;
}

class Human implements eat {
  putIn(a: string): boolean {
    if (a.length < 10) {
      console.log(a);
      return true;
    } else {
      return false;
    }
  }

  chew(a: string): boolean {
    if (a.length < 10) {
      console.log(a);
      return true;
    } else {
      return false;
    }
  }

  public swallow(a: string): boolean {
    if (a.length < 10) {
      console.log(a);
      return true;
    } else {
      return false;
    }
  }
}

// using interface `eat`
var a: eat;
a = new Human();
// const human = new Human();
a.chew("chew");
a.putIn("putIn");
a.swallow("swallow");
