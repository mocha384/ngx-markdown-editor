import { Component } from "@angular/core";
import { UploadResult, MdEditorOption } from "./../../../src/public_api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public options: MdEditorOption = {
    showPreviewPanel: false,
    enablePreviewContentClick: false,
    resizable: false,
    // customRender: {
    //   image: function (href: string, title: string, text: string) {
    //     console.log(`href : ${href}`);
    //     console.log(`title : ${title}`);
    //     console.log(`text : ${text}`);
    //     // let out = `<img style="max-width: 100%; border: 20px solid red;" src="${href}" alt="${text}"`;
    //     let out = `<img style="width: 500px; height:400px" src="${href}" alt="${text}"`;
    //     if (title) {
    //       out += ` title="${title}"`;
    //     }
    //     out += (<any>this.options).xhtml ? "/>" : ">";

    //     console.log(`out : ${out}`);
    //     return out;
    //   },
    // },
  };
  public content: string = `![](https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=1600&h=900)`;
  //   = `## Markdown __rulez__!
  // ---

  // ### Syntax highlight
  // \`\`\`typescript
  // const language = 'typescript';
  // \`\`\`

  // :heart:
  // ### Lists
  //  1. Ordered list
  //  2. Another bullet point
  //  - Unordered list
  //  - Another unordered bullet point

  // ### Blockquote
  // > Blockquote to the max`;

  public mode: string = "editor";

  constructor() {
    this.preRender = this.preRender.bind(this);
    this.postRender = this.postRender.bind(this);
  }

  ngOnInit() {
    // let contentArr = ["# Hello, Markdown Editor!"];
    // contentArr.push("```javascript ");
    // contentArr.push("function Test() {");
    // contentArr.push('	console.log("Test");');
    // contentArr.push("}");
    // contentArr.push("```");
    // contentArr.push(" Name | Type");
    // contentArr.push(" ---- | ----");
    // contentArr.push(" A | Test");
    // contentArr.push(
    //   "![](http://lon-yang.github.io/markdown-editor/favicon.ico)"
    // );
    // contentArr.push("");
    // contentArr.push("- [ ] Taks A");
    // contentArr.push("- [x] Taks B");
    // contentArr.push("- test");
    // contentArr.push("");
    // contentArr.push("[Link](https://www.google.com)");
    // contentArr.push("");
    // this.content = contentArr.join("\r\n");
  }

  togglePreviewPanel() {
    this.options.showPreviewPanel = !this.options.showPreviewPanel;
    this.options = Object.assign({}, this.options);
  }

  changeMode() {
    this.mode = "editor";
  }

  togglePreviewClick() {
    this.options.enablePreviewContentClick = !this.options
      .enablePreviewContentClick;
    this.options = Object.assign({}, this.options);
  }

  toggleResizeAble() {
    this.options.resizable = !this.options.resizable;
    this.options = Object.assign({}, this.options);
  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    console.log(files);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result: Array<UploadResult> = [];
        for (let file of files) {
          result.push({
            name: file.name,
            url: `https://avatars3.githubusercontent.com/${file.name}`,
            isImg: file.type.indexOf("image") !== -1,
          });
        }
        resolve(result);
      }, 3000);
    });
  }

  onEditorLoaded(editor) {
    console.log(`ACE Editor Ins: `, editor);
    // editor.setOption('showLineNumbers', false);

    // setTimeout(() => {
    //   editor.setOption('showLineNumbers', true);
    // }, 2000);
  }

  preRender(mdContent) {
    console.log(`preRender fired`);
    console.log(mdContent);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(mdContent);
    //   }, 4000);
    // })
    return mdContent;
  }

  postRender(html) {
    console.log(`postRender fired`);
    // console.log(html);
    // return '<h1>Test</h1>';
    return html;
  }

  onPreviewDomChanged(dom: HTMLElement) {
    console.log(`onPreviewDomChanged fired`);
    // console.log(dom);
    // console.log(dom.innerHTML)
  }
}
