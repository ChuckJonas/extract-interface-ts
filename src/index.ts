'use strict';

import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {TerminalNode, ParseTreeWalker}  from 'antlr4ts/tree';
import {JavaLexer} from './grammar/JavaLexer'
import {JavaParser} from './grammar/JavaParser'
import {ExtractInterfaceListener} from './extractInterfaceListener'

import * as fs from 'fs';

import * as os from 'os';
class Startup {
    public static main(): number {
        fs.readFile('./testing/Demo.java',(err, data) =>{
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
    }
}


Startup.main();






