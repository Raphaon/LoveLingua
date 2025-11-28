import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OfflineGuard } from './core/guards/offline.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'onboarding', loadComponent: () => import('./pages/onboarding/onboarding.page').then(m => m.OnboardingPage) },
  { path: 'profile-setup', loadComponent: () => import('./pages/profile-setup/profile-setup.page').then(m => m.ProfileSetupPage) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage) },
  { path: 'quiz', loadComponent: () => import('./pages/quiz/quiz.page').then(m => m.QuizPage) },
  { path: 'results', loadComponent: () => import('./pages/results/results.page').then(m => m.ResultsPage) },
  { path: 'suggestions', loadComponent: () => import('./pages/suggestions/suggestions.page').then(m => m.SuggestionsPage) },
  { path: 'conversation-questions', loadComponent: () => import('./pages/conversation-questions/conversation-questions.page').then(m => m.ConversationQuestionsPage) },
  { path: 'couple-setup', loadComponent: () => import('./pages/couple-setup/couple-setup.page').then(m => m.CoupleSetupPage) },
  { path: 'couple-comparison', loadComponent: () => import('./pages/couple-comparison/couple-comparison.page').then(m => m.CoupleComparisonPage) },
  { path: 'quest-history', loadComponent: () => import('./pages/quest-history/quest-history.page').then(m => m.QuestHistoryPage) },
  { path: 'multiplayer-lobby', loadComponent: () => import('./pages/multiplayer-lobby/multiplayer-lobby.page').then(m => m.MultiplayerLobbyPage) },
  { path: 'multiplayer-session', canActivate: [OfflineGuard], loadComponent: () => import('./pages/multiplayer-session/multiplayer-session.page').then(m => m.MultiplayerSessionPage) },
  { path: 'partner-quiz-intro', loadComponent: () => import('./pages/partner-quiz-intro/partner-quiz-intro.page').then(m => m.PartnerQuizIntroPage) },
  { path: 'partner-quiz-session', loadComponent: () => import('./pages/partner-quiz-session/partner-quiz-session.page').then(m => m.PartnerQuizSessionPage) },
  { path: 'shared-wishlist', loadComponent: () => import('./pages/shared-wishlist/shared-wishlist.page').then(m => m.SharedWishlistPage) },
  { path: 'emotional-checkin', loadComponent: () => import('./pages/emotional-checkin/emotional-checkin.page').then(m => m.EmotionalCheckinPage) },
  { path: 'digital-coupons', loadComponent: () => import('./pages/digital-coupons/digital-coupons.page').then(m => m.DigitalCouponsPage) },
  { path: 'gratitude-wall', loadComponent: () => import('./pages/gratitude-wall/gratitude-wall.page').then(m => m.GratitudeWallPage) },
  { path: 'history', loadComponent: () => import('./pages/history/history.page').then(m => m.HistoryPage) },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
