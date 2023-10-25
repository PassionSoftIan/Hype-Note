package com.surf.quiz.repository;

import com.surf.quiz.entity.Quiz;
import com.surf.quiz.entity.QuizRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends MongoRepository<QuizRoom, String> {
    Quiz save(Quiz quiz);
    void delete(Quiz quiz);
    Optional<Quiz> findByRoomId(String roomId);
}


