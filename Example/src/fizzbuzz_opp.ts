// https://zenn.dev/karibash/articles/0d20cb3f5838f0

interface Specification<Input> {
  isSatisfiedBy(value: Input): boolean;
}

class TypeSpecification implements Specification<any> {
  constructor(private readonly type: string) {}

  public isSatisfiedBy(value: number): boolean {
    return typeof value === this.type;
  }
}

class DivisibleSpecification implements Specification<number> {
  constructor(private readonly divisor: number) {}

  public isSatisfiedBy(value: number): boolean {
    return value % this.divisor === 0;
  }
}

class CompositeSpecification<Input> implements Specification<Input> {
  private constructor(private readonly predicate: (value: Input) => boolean) {}

  public static when<Input>(
    specification: Specification<Input>
  ): CompositeSpecification<Input> {
    return new CompositeSpecification((value) =>
      specification.isSatisfiedBy(value)
    );
  }

  public isSatisfiedBy(value: Input): boolean {
    return this.predicate(value);
  }

  public and(
    specification: Specification<Input>
  ): CompositeSpecification<Input> {
    return new CompositeSpecification(
      (value) => this.predicate(value) && specification.isSatisfiedBy(value)
    );
  }

  public or(
    specification: Specification<Input>
  ): CompositeSpecification<Input> {
    return new CompositeSpecification(
      (value) => this.predicate(value) || specification.isSatisfiedBy(value)
    );
  }
}

interface HasSpecification<Input> {
  readonly specification: Specification<Input>;
}

interface Operation<Input, Output> {
  invoke(value: Input): Output;
}

class NumberToStringOperation
  implements Operation<number, string>, HasSpecification<number>
{
  constructor(
    private readonly converter: (value: number) => string,
    public readonly specification: Specification<number>
  ) {}

  public invoke(value: number): string {
    return this.converter(value);
  }
}

class Operator<Input, Output> {
  constructor(
    private readonly operations: Array<
      Operation<Input, Output> & HasSpecification<Input>
    >
  ) {}

  public invoke(value: Input): Output {
    const operation = this.operations.find((operation) =>
      operation.specification.isSatisfiedBy(value)
    );
    if (!operation) throw new Error("Operation does not found");
    return operation.invoke(value);
  }
}

const operator = new Operator([
  new NumberToStringOperation(
    () => "FizzBuzz",
    CompositeSpecification.when(new TypeSpecification("number"))
      .and(new DivisibleSpecification(3))
      .and(new DivisibleSpecification(5))
  ),
  new NumberToStringOperation(
    () => "Fizz",
    CompositeSpecification.when(new TypeSpecification("number")).and(
      new DivisibleSpecification(3)
    )
  ),
  new NumberToStringOperation(
    () => "Buzz",
    CompositeSpecification.when(new TypeSpecification("number")).and(
      new DivisibleSpecification(5)
    )
  ),
  new NumberToStringOperation(
    (value) => value.toString(),
    CompositeSpecification.when(new TypeSpecification("number"))
  ),
]);

for (let i = 1; i <= 100; i++) {
  console.log(operator.invoke(i));
}
