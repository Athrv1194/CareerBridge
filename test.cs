using CareerBridge.API.Data;
using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseInMemoryDatabase(databaseName: "TestDb")
    .Options;

using (var context = new AppDbContext(options))
{
    var existing = new UserAssessment { UserId = 1, Completed = true, Answers = new List<UserAssessmentAnswer> { new UserAssessmentAnswer { QuestionId = 1, OptionId = 1 } } };
    context.UserAssessments.Add(existing);
    context.SaveChanges();

    var existingDb = context.UserAssessments.Include(u => u.Answers).First(u => u.UserId == 1);
    
    var assessment = new UserAssessment { UserId = 1, Completed = true, SubmittedAt = DateTime.UtcNow, Answers = new List<UserAssessmentAnswer> { new UserAssessmentAnswer { QuestionId = 2, OptionId = 2 } } };
    
    context.UserAssessmentAnswers.RemoveRange(existingDb.Answers);
    existingDb.Answers = assessment.Answers;
    existingDb.SubmittedAt = assessment.SubmittedAt;
    existingDb.Completed = assessment.Completed;
    context.UserAssessments.Update(existingDb);
    
    try {
        context.SaveChanges();
        Console.WriteLine("Success");
    } catch (Exception ex) {
        Console.WriteLine("Error: " + ex.Message);
    }
}
