-- Reset student_responses table to ensure schema matches code
DROP TABLE IF EXISTS student_responses;

CREATE TABLE student_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentId INT NOT NULL,
  tabNumber INT NOT NULL,
  responseData JSON DEFAULT '{}',
  colorFeelings JSON DEFAULT '{}',
  fontShapeAnswers JSON DEFAULT '{}',
  gestaltAnswers JSON DEFAULT '{}',
  canvaLink TEXT,
  vectorFileUrl TEXT,
  presentationFileUrl TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_student_tab (studentId, tabNumber)
);
