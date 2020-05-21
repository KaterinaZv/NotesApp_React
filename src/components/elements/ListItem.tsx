import React from 'react';
import { Note } from '../../core/models/note';

type Props = {
  onClick: (note: Note) => void;
  note: Note;
  onRemoveClick: (note: Note) => void;
}

const ListItem: React.FC<Props> = ({ onClick, note, onRemoveClick }) => {
  const onItemClick = () => {
    onClick(note);
  }

  const deleteNote = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    onRemoveClick(note);
  }

  return (
    <div className="note-item" onClick={onItemClick}>
      {
        note.text || 'Пустая заметка'
      }
      <span role="img" className='note-item__remove' aria-label="удалить" onClick={deleteNote}>❌</span>
    </div>
  )
}

export default ListItem;