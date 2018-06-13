class UserForbiddenWordsValidator < ActiveModel::Validator
  def validate(record)
    if record.name =~ /.*Twitter*/i || record.name =~ /.*Admin*/i
      record.errors[:name] << "使用できない単語を含んでいます。"
    end
  end
end
