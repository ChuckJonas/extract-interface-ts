'use strict';

import { ANTLRInputStream, CommonTokenStream,  } from 'antlr4ts';
import {TerminalNode, ParseTreeWalker}  from 'antlr4ts/tree';
// import {HelloLexer} from './grammar/HelloLexer'
// import {HelloParser} from './grammar/HelloParser'
import {JavaLexer} from './grammar/JavaLexer'
import {JavaParser} from './grammar/JavaParser'
import {ExtractInterfaceListener} from './extractInterfaceListener'

import * as fs from 'fs';

import * as os from 'os';
class Startup {
    public static main(): number {
        fs.readFile('./testing/class.cls',(err, data) =>{
            if(!err){
                Startup.walk(data.toString())
            }else{
                console.log(err);
            }
        });

        return 0;
    }

    public static walk(data:string){
    // Create the lexer and parser
        let inputStream = new ANTLRInputStream(data);
        let lexer = new JavaLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new JavaParser(tokenStream);
        parser.buildParseTree = true;
        var tree = parser.compilationUnit();
        let printer = new ExtractInterfaceListener(parser);
        ParseTreeWalker.DEFAULT.walk(printer, tree);

        // // Parse the input, where `compilationUnit` is whatever entry point you defined
        // let result = parser.methodDeclaration();

        // result.children.forEach((item, index)  => {
        //     let token = <TerminalNode> item;
        //     // console.log(`@${index}${item.symbol.start}'${item.text}'`);
        //     console.log(`@${index},${token.symbol.startIndex}:${token.symbol.stopIndex}'${item.text}'<${token.symbol.type}>,${token.symbol.line}:${token.symbol.charPositionInLine}`);
        // });
    }
}



Startup.main();






