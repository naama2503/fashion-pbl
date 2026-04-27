DROP TABLE IF EXISTS student_responses;
CREATE TABLE student_responses (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  tab_number INTEGER NOT NULL,
  response_data JSONB DEFAULT '{}',
  color_feelings JSONB DEFAULT '{}',
  font_shape_answers JSONB DEFAULT '{}',
  gestalt_answers JSONB DEFAULT '{}',
  canva_link TEXT DEFAULT '',
  vector_file_url TEXT DEFAULT '',
  presentation_file_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
