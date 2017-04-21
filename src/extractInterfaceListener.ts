
import {ClassDeclarationContext} from './grammar/JavaParser';
import {MethodDeclarationContext} from './grammar/JavaParser';
import {TerminalNode} from 'antlr4ts/tree';

import {TokenStream} from 'antlr4ts/TokenStream';
import {JavaParser} from './grammar/JavaParser';
import {JavaListener} from './grammar/JavaListener';

export class ExtractInterfaceListener implements JavaListener {

    private parser : JavaParser;
    constructor(parser: JavaParser){
        this.parser = parser;
    }

    public enterClassDeclaration(ctx: ClassDeclarationContext){
        console.log("interface I"+ctx.Identifier()+" {");
    }

    public exitClassDeclaration(ctx: ClassDeclarationContext){
        console.log("}");
    }

    public enterMethodDeclaration(ctx: MethodDeclarationContext){
        let tokens = this.parser.inputStream;

        let type = "void";
        if ( ctx.type()!=null ) {
            type = tokens.getText(ctx.type());
        }
        let args = tokens.getText(ctx.formalParameters());
        console.log(`\t${type} ${ctx.Identifier()}${args};`);
    }
}
