FactoryBot.define do

  factory :message do
    body         {"hello"}
    image        {File.open("#{Rails.root}/public/images/PPP_ikiritatukame_TP_V4.jpeg")}
    user_id     {"1"}
    group_id    {"1"}
  end

end