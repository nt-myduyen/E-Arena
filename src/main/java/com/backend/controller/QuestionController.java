package com.backend.controller;

import com.backend.model.Question;
import com.backend.model.Topic;
import com.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questions")
@CrossOrigin("http://localhost:3000")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping()
    public ResponseEntity<Iterable<Question>> getAllQuestions() {
        List<Question> questions = (List<Question>)questionService.findAll();
        if(questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<Iterable<Question>> getQuestionsByExam(@PathVariable Integer examId) {
        List<Question> questions = questionService.getQuestionsByExam(examId);
        if(questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Integer id) {
        Optional<Question> questionOptional = questionService.findById(id);

        if(!questionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<Question>(questionOptional.get(), HttpStatus.OK);
    }

    @GetMapping("/getQuestionRandomBySystem")
    public ResponseEntity<Iterable<Question>> getQuestionsRandom() {
        List<Question> questions = questionService.getQuestionRandomBySystem(10);
        if(questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/getQuestionRandomByUser")
    public ResponseEntity<Iterable<Question>> getQuestionsRandomByUser(
            @RequestParam int number_question_easy,
            @RequestParam int number_question_medium,
            @RequestParam int number_question_hard
    ) {
        List<Question> questions = questionService.getQuestionRandomByUser(1, number_question_easy);
        questions.addAll(questionService.getQuestionRandomByUser(2, number_question_medium));
        questions.addAll(questionService.getQuestionRandomByUser(3, number_question_hard));
        if(questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Question> save(@RequestBody Question question) {
        return new ResponseEntity<>(questionService.save(question), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> update(@PathVariable Integer id, @RequestBody Question question) {
        Optional<Question> questionOptional = questionService.findById(id);
        if (!questionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        question.setId(id);
        return new ResponseEntity<>(questionService.save(question), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Question> delete(@PathVariable Integer id) {
        Optional<Question> questionOptional = questionService.findById(id);
        if (!questionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        questionService.deleteById(id);
        return new ResponseEntity<>(questionOptional.get(), HttpStatus.NO_CONTENT);
    }
}