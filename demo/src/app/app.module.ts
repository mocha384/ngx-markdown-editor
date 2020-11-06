import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule, SecurityContext } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LMarkdownEditorModule } from "./../../../src/public_api";
import { MarkdownModule, MarkedRenderer, MarkedOptions } from "ngx-markdown";

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    console.log("bloackquote", text);
    return '<blockquote class="blockquote">' + text + "</blockquote>";
  };

  renderer.image = (href: string, title: string, text: string) => {
    // console.log(`href : ${href}`);
    // console.log(`title : ${title}`);
    // console.log(`text : ${text}`); //justify-content="center" align-items="center"
    let out = `<img src="${href}" alt="${text}" class="rounded mx-auto d-block my-5" width="40%"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += (<any>this).xhtml ? "/>" : ">";

    console.log(`out : ${out}`);
    return out;
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    LMarkdownEditorModule,
    AppRoutingModule,
    MarkdownModule.forRoot({
      // sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
