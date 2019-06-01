/**
 * Backend Modules
 *
 * The Controller of markdown editor
 *
 * === Functions ===
 * - Convert the markdown text to the html text.
 * - Toggle editor view.
 */
// libraries
const marked = require('marked');

class MdEditor {
    private document: HTMLElement = null;

    private boxes: HTMLElement = null;

    // dom elements
    private activeMarkdown: HTMLElement = null;
    private activePreview: HTMLElement = null;
    private activeHeader: HTMLElement = null;

    private maxItemSize = 0;
    private currentNodeIndex = 0;

    // marked options
    private markedOptions: object = {};

    constructor(document: HTMLElement) {
        this.document = document;
    }

    init(): void {
        // get All fields
        this.boxes = this.document.querySelectorAll('.box');

        // get Active field
        this.activeMarkdown = this.document.querySelector(
            '.markdown-text.active'
        );
        this.activePreview = this.document.querySelector(
            '.markdown-preview.active'
        );
        this.activeHeader = this.document.querySelector('.box-header.active');

        this.maxItemSize = this.boxes.length;
    }

    convert(): void {
        const text = this.activeMarkdown.value;

        // translated!
        console.warn(marked(text, this.markedOptions));
        this.activePreview.innerHTML = marked(text, this.markedOptions);
    }

    toggle(): void {
        this.convert();

        this.activeMarkdown.classList.toggle('d-none');
        this.activePreview.classList.toggle('d-none');
    }

    move(target: HTMLInputElement): void {
        const index = this.activeMarkdown.dataset.index;

        // update current field index
        if (target === 'next') {
            this.currentNodeIndex = index < this.maxItemSize ? index : 0;
        } else {
            this.currentNodeIndex =
                index > 1 ? index - 2 : this.maxItemSize - 1;
        }

        // remove active class from current target dom.
        this.activeMarkdown.classList.remove('active');
        this.activePreview.classList.remove('active');
        this.activeHeader.classList.remove('active');

        this.activeMarkdown.setAttribute('readonly', true);

        // add active class to new target dom.
        this.activeMarkdown = this.boxes[this.currentNodeIndex].querySelector(
            '.markdown-text'
        );
        this.activePreview = this.boxes[this.currentNodeIndex].querySelector(
            '.markdown-preview'
        );
        this.activeHeader = this.boxes[this.currentNodeIndex].querySelector(
            '.box-header'
        );

        this.activeMarkdown.classList.add('active');
        this.activePreview.classList.add('active');
        this.activeHeader.classList.add('active');

        // focus to new markdown editor
        this.activeMarkdown.focus();

        this.activeMarkdown.removeAttribute('readonly');
    }
}

module.exports = MdEditor;