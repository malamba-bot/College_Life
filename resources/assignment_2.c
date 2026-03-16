List newList() {
    List newList = malloc(sizeof(ListObj));
    assert(newList != NULL);
    newList->front = newList->back 
        = newList->cursor = NULL;
    newList->cursorPos = -1;
    newList->length = 0;
    return newList;
}



