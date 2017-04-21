# extract-interface-ts
A Typescript port of a demo from the [Definitive Antlr 4 Reference](https://pragprog.com/book/tpantlr2/the-definitive-antlr-4-reference) (chapter 4.3) using [antlr4ts](https://github.com/tunnelvisionlabs/antlr4ts).

## Setup

`npm install`

## Example

Input:
```
import java.util.List;
import java.util.Map;
public class Demo {
	void f(int x, String y) { }
	int[ ] g(/*no args*/) { return null; }
	List<Map<String, Integer>>[] h() { return null; }
}
```

Output:
```
interface IDemo {
	void f(int x, String y);
	int[ ] g(/*no args*/);
	List<Map<String, Integer>>[] h();
}
```