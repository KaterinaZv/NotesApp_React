import React from 'react';
import './App.css';
import TextArea from '../../elements/textarea';
import SidebarList from '../../elements/sidebar__list';
import { Note, createEmptyNote } from '../../../core/models/note';
import ListItem from '../../elements/ListItem';

type AppState = {
  notes: Note[];
  selectedNote?: Note;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    notes: [],
  }

  componentDidMount() {
    const notesList = JSON.parse(localStorage.getItem('notes') || '[]');
    this.setState({ notes: notesList })
  }

  saveNotes = (notes: Note[]) => {
    this.setState({
      notes
    })
    localStorage.setItem('notes', JSON.stringify(this.state.notes));
  }

  createNote = (): void => {
    const previousNotes = [...this.state.notes];
    previousNotes.unshift(createEmptyNote());

    this.saveNotes(previousNotes);
  }

  onItemClick = (selectedNote: Note) => {
    this.setState({
      selectedNote,
    })
  }

  onNoteDelete = (note: Note) => {
    const notes = [...this.state.notes];
    const noteIndex = notes.findIndex((item) => (item.id === note.id));
    notes.splice(noteIndex, 1);

    const isCurrentNoteDeleted = this.state.selectedNote && note.id === this.state.selectedNote.id;

    this.setState({
      notes,
      selectedNote: isCurrentNoteDeleted ? undefined : this.state.selectedNote
    })

    localStorage.setItem('notes', JSON.stringify(notes));
  }

  onNoteChange = (input: string) => {
    this.setState(({ selectedNote, notes }) => ({
      selectedNote: { ...selectedNote as Note, text: input },
      notes: notes.map((note) => selectedNote && note.id === selectedNote.id ? ({ ...note, text: input }) : note)
    }));
  }


  render() {
    return (
      <main>
        <div id="sidebar">
          <SidebarList>
            {
              this.state.notes.map((note) =>
                <ListItem
                  key={note.id}
                  note={note}
                  onClick={this.onItemClick}
                  onRemoveClick={this.onNoteDelete} />
              )
            }
          </SidebarList>

          <div className="sidebar-footer">
            <button
              onClick={this.createNote} id="note-create_button">Создать заметку</button>
          </div>
        </div>
        {
          this.state.selectedNote && (
            <TextArea
              placeholder="Начните писать"
              value={this.state.selectedNote.text}
              onChange={this.onNoteChange}
            />
          )
        }
      </main>
    );
  }
}

export default App;
