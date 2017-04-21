
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
        // let params = ctx.formalParameters();
        // let args = tokens.getText(params);
        // this.methods.push(`${type} ${ctx.Identifier()}${args}`);
        // this.methods.push(`${ctx.Identifier()} ${ctx.Identifier()}${ctx.methodDeclaratorRest}`);

        // console.log("\t"+type+" "+ctx.Identifier()+args+";");
        // let identifier: string;
        // let vis: string;
        // let returns: string;

        // ctx.children.forEach(child  => {
        //     if(child instanceof TerminalNode){
        //         let tNode = <TerminalNode> child;
        //         if(tNode.symbol.type == 120){
        //             //console.log(tNode.symbol.text);
        //             identifier = tNode.symbol.text;
        //         }else if(tNode.symbol.type == 57){
        //             console.log(tNode.symbol.text);
        //             returns = tNode.symbol.text;
        //         }else if(tNode.symbol.type == 44){
        //             // console.log(tNode.symbol.text);
        //             vis = tNode.symbol.text;
        //         }else{
        //             // console.log(child.text);
        //         }
        //     }

        // });
        // console.log(
        // `/*
        //   * ${identifier} ${vis}
        //   * @return ${returns}
        //   */
        // `)
    }
}
