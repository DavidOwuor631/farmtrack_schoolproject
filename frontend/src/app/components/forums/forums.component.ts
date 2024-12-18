import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Reply {
  author: string;
  content: string;
}

interface Topic {
  id: number;
  title: string;
  content: string;
  author: string;
  replies: Reply[];
  showReplies: boolean;
}

@Component({
  selector: 'app-forums',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css'
})
export class ForumsComponent {

    isNewTopicVisible = false;
    newTopicTitle = '';
    newTopicContent = '';
    newReplyContent = '';
  
    topics: Topic[] = [
      {
        id: 1,
        title: 'Best Crops for Dry Season',
        content: 'What crops do you recommend for dry seasons in tropical climates?',
        author: 'FarmerJohn',
        replies: [
          { author: 'AgriExpert', content: 'Consider planting drought-resistant crops like sorghum and millet.' },
          { author: 'GreenThumb', content: 'You can also look into crop rotation with legumes.' }
        ],
        showReplies: false
      },
      {
        id: 2,
        title: 'Pest Control Methods',
        content: 'What are the best organic pest control methods?',
        author: 'EcoFarmer',
        replies: [
          { author: 'BioFarmer', content: 'Neem oil and garlic spray are effective organic methods.' }
        ],
        showReplies: false
      }
    ];
  
    toggleNewTopic(): void {
      this.isNewTopicVisible = !this.isNewTopicVisible;
    }
  
    addNewTopic(): void {
      if (this.newTopicTitle && this.newTopicContent) {
        const newTopic: Topic = {
          id: this.topics.length + 1,
          title: this.newTopicTitle,
          content: this.newTopicContent,
          author: 'You', // Replace with the logged-in user's name
          replies: [],
          showReplies: false
        };
  
        this.topics.push(newTopic);
        this.newTopicTitle = '';
        this.newTopicContent = '';
        this.isNewTopicVisible = false;
      }
    }
  
    toggleReplies(topicId: number): void {
      const topic = this.topics.find(t => t.id === topicId);
      if (topic) {
        topic.showReplies = !topic.showReplies;
      }
    }
  
    addReply(topicId: number): void {
      if (this.newReplyContent) {
        const topic = this.topics.find(t => t.id === topicId);
        if (topic) {
          const newReply: Reply = {
            author: 'You', // Replace with the logged-in user's name
            content: this.newReplyContent
          };
  
          topic.replies.push(newReply);
          this.newReplyContent = '';
        }
      }
    }

}
