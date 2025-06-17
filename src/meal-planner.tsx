import React, { useState } from 'react';
import { RefreshCw, Clock, Users, ChefHat } from 'lucide-react';

// 型定義
interface Meal {
  name: string;
  time: string;
  ingredients: string[];
  description: string;
}

interface Preferences {
  cuisine: CuisineType;
  cookingTime: CookingTimeType;
  people: number;
}

type CuisineType = 'all' | 'japanese' | 'western' | 'chinese';
type CookingTimeType = 'all' | 'quick' | 'medium' | 'long';

interface MealsDatabase {
  japanese: Meal[];
  western: Meal[];
  chinese: Meal[];
}

const MealPlanner: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    cuisine: 'all',
    cookingTime: 'all',
    people: 2
  });

  const meals: MealsDatabase = {
    japanese: [
      { name: '親子丼', time: '15分', ingredients: ['鶏肉', '卵', '玉ねぎ', 'ご飯'], description: 'ふわふわ卵の定番丼' },
      { name: '鮭の塩焼き定食', time: '20分', ingredients: ['鮭', 'ご飯', '味噌汁', '漬物'], description: 'シンプルで健康的な和食' },
      { name: 'カレーライス', time: '30分', ingredients: ['牛肉', 'じゃがいも', '人参', 'カレールー'], description: 'みんな大好きカレー' },
      { name: '焼き魚定食', time: '25分', ingredients: ['さんま', 'ご飯', '大根おろし'], description: '季節の魚で栄養満点' },
      { name: 'チャーハン', time: '10分', ingredients: ['ご飯', '卵', 'ねぎ', 'ハム'], description: '簡単で美味しい炒飯' }
    ],
    western: [
      { name: 'ハンバーグ', time: '25分', ingredients: ['牛豚合挽き肉', '玉ねぎ', 'パン粉'], description: 'ジューシーなハンバーグ' },
      { name: 'パスタ カルボナーラ', time: '15分', ingredients: ['パスタ', 'ベーコン', '卵', 'チーズ'], description: 'クリーミーなイタリアン' },
      { name: 'グラタン', time: '35分', ingredients: ['マカロニ', 'ホワイトソース', 'チーズ'], description: '熱々とろけるグラタン' },
      { name: 'オムライス', time: '20分', ingredients: ['ご飯', '卵', 'ケチャップ', '鶏肉'], description: 'ふわふわ卵のオムライス' },
      { name: 'ステーキ', time: '15分', ingredients: ['牛ステーキ肉', 'にんにく', 'バター'], description: 'ご褒美ステーキ' }
    ],
    chinese: [
      { name: '麻婆豆腐', time: '20分', ingredients: ['豆腐', '豚ひき肉', '豆板醤'], description: 'ピリ辛で美味しい中華' },
      { name: '青椒肉絲', time: '15分', ingredients: ['ピーマン', '豚肉', 'たけのこ'], description: 'シャキシャキ野菜炒め' },
      { name: 'エビチリ', time: '25分', ingredients: ['エビ', 'チリソース', 'にんにく'], description: 'プリプリエビの定番' },
      { name: '酢豚', time: '30分', ingredients: ['豚肉', 'パイナップル', 'ピーマン'], description: '甘酸っぱい人気料理' },
      { name: '中華丼', time: '20分', ingredients: ['白菜', '豚肉', 'きくらげ', 'ご飯'], description: 'あんかけが美味しい丼' }
    ]
  };

  const getAllMeals = (): Meal[] => {
    return [...meals.japanese, ...meals.western, ...meals.chinese];
  };

  const getFilteredMeals = (): Meal[] => {
    let filteredMeals: Meal[] = preferences.cuisine === 'all' ? getAllMeals() : meals[preferences.cuisine];
    
    if (preferences.cookingTime !== 'all') {
      filteredMeals = filteredMeals.filter((meal: Meal) => {
        const time: number = parseInt(meal.time);
        if (preferences.cookingTime === 'quick') return time <= 15;
        if (preferences.cookingTime === 'medium') return time > 15 && time <= 30;
        return time > 30;
      });
    }
    
    return filteredMeals;
  };

  const generateMeal = (): void => {
    const availableMeals: Meal[] = getFilteredMeals();
    if (availableMeals.length === 0) {
      setCurrentMeal({ 
        name: '条件に合う料理が見つかりません', 
        time: '', 
        ingredients: [], 
        description: '条件を変更してみてください' 
      });
      return;
    }
    const randomMeal: Meal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
    setCurrentMeal(randomMeal);
  };

  const getCuisineLabel = (cuisine: CuisineType): string => {
    const labels: Record<CuisineType, string> = { 
      japanese: '和食', 
      western: '洋食', 
      chinese: '中華', 
      all: 'すべて' 
    };
    return labels[cuisine];
  };

  const getTimeLabel = (time: CookingTimeType): string => {
    const labels: Record<CookingTimeType, string> = { 
      quick: '15分以内', 
      medium: '30分以内', 
      long: '30分以上', 
      all: 'すべて' 
    };
    return labels[time];
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPreferences({...preferences, cuisine: e.target.value as CuisineType});
  };

  const handleCookingTimeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPreferences({...preferences, cookingTime: e.target.value as CookingTimeType});
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPreferences({...preferences, people: parseInt(e.target.value)});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-800">今日の献立提案</h1>
          </div>
          <p className="text-gray-600">毎日の献立選びをお手伝いします</p>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">お好みの設定</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cuisine Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">料理の種類</label>
              <select
                value={preferences.cuisine}
                onChange={handleCuisineChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">すべて</option>
                <option value="japanese">和食</option>
                <option value="western">洋食</option>
                <option value="chinese">中華</option>
              </select>
            </div>

            {/* Cooking Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">調理時間</label>
              <select
                value={preferences.cookingTime}
                onChange={handleCookingTimeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">すべて</option>
                <option value="quick">15分以内</option>
                <option value="medium">30分以内</option>
                <option value="long">30分以上</option>
              </select>
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">人数</label>
              <select
                value={preferences.people}
                onChange={handlePeopleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value={1}>1人</option>
                <option value={2}>2人</option>
                <option value={3}>3人</option>
                <option value={4}>4人</option>
                <option value={5}>5人以上</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-6">
          <button
            onClick={generateMeal}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            今日の献立を提案
          </button>
        </div>

        {/* Current Meal Display */}
        {currentMeal && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{currentMeal.name}</h2>
            <p className="text-gray-600 mb-4">{currentMeal.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">調理時間: {currentMeal.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">人数: {preferences.people}人分</span>
              </div>
            </div>

            {currentMeal.ingredients.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">主な材料:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentMeal.ingredients.map((ingredient: string, index: number) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Current Settings Display */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">現在の設定</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {getCuisineLabel(preferences.cuisine)}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {getTimeLabel(preferences.cookingTime)}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {preferences.people}人分
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;